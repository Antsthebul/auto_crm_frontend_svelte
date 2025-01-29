<style>
    #touchless{
        height: 1em;
        width: 300px;
        border: 1px solid lightgrey;
        border-radius: 15px;
        margin: 0 auto;
        padding:10px;
    }
    
    #filterContainer{
        display: flex;
        gap:5px;
    }
</style>
<script lang="ts">
    import { enhance } from "$app/forms";

    const SEARCH_FILTERS = ["tech ID", "tech name", "Appt", "RO", "Customer", "plate"]

    let searchText:string
    let searchTextClean: {[k in string]:string} = {}
    let usedFilters:string[] = []
    

    $: {
        const match = /\b(.*):&/i.exec(searchText)
        if (match && SEARCH_FILTERS.includes(match[1])){
            const group = match[1]
            searchText = searchText.replace(group, wrappedFilter(group))
            const touchlessEl = document.getElementById("touchless")
            touchlessEl!.focus();
            // select all the content in the element
            document.execCommand('selectAll', false, undefined);
            // collapse selection to the end
            document.getSelection()!.collapseToEnd();


        }
        const pattern = new RegExp(`>(?<group>.+?)</span>:.*?(?<data>[a-z]+)`, "gmi")
        const dataMatch = pattern.exec(searchText?.toString())
        if (dataMatch){
            const group = dataMatch.groups!.group
            const data = dataMatch.groups!.data

            searchTextClean[group] = data
        }
  
        // pattern.
    }

    function wrappedFilter(text:string):string{
        return `<span style="display: inline-block;
                    background-color: rgb(30, 208, 208);
                    color: rgb(255, 255, 255);
                    text-decoration: solid;
                    border-radius:5px">${text}</span>`
    }
    function filterInput(e:KeyboardEvent){
        
        if (e.key === "Enter"){
            if (!Object.keys(searchTextClean).length){
                alert("Add datata")
            }else{
                alert(JSON.stringify(searchTextClean))

            }
            e.preventDefault()
        }
        
    }
</script>

<h1>Hello Person</h1>



<form method="post" action="/api/customers" use:enhance={({ formElement, formData, action, cancel, submitter })=>{
    return async ({ result })=>{
        formElement.reset()
    }
}}>
    <div id="filterContainer">

        {#each SEARCH_FILTERS as search}
        <span class="selectable">{search}</span>
        {/each}
    </div>
     <div id="touchless" contenteditable bind:innerHTML={searchText} 
            on:keydown={filterInput} role="textbox" tabindex="0"></div>
</form>
<h3>Appointments</h3>
<h3>Repair Orders</h3>
<h3>Techs</h3>