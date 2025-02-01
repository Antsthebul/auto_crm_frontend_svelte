<style>
    @import "../app.css";

    .searchWindow{
        height: 450px;

    }
    .scheduleSummary{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid black;
        border-radius: 15px;
    }

    #searchSection{
        margin:0 auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    #touchless{
        height: 1em;
        width: 300px;
        border: 1px solid lightgrey;
        border-radius: 15px;
        padding:10px;
        display: inline-block;
    }
    
    #filterContainer{
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        gap:5px;
        width: 100%;
    }
    .test{
        justify-content: center;
    }
</style>
<script lang="ts">


    const SEARCH_FILTERS = ["TechID", 
        "Tech name", "Appt", "RO", "Customer", "Plate", "Phone", "CustomerId"]

    let searchText:string
    let searchTextClean: {[k in string]:string} = {}
    let usedFilters:string[] = []
    

    $: {
        const match = /\b(.*):&/i.exec(searchText)
        if (match && SEARCH_FILTERS.map(s=>s.toLocaleLowerCase()).includes(match[1].toLocaleLowerCase())){
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
                
            }else{
                alert(JSON.stringify(searchTextClean))

            }
            e.preventDefault()
        }
    }


</script>

<h1>Hello Person</h1>


<div id="searchSection">
    <div id="filterContainer">
        
        {#each SEARCH_FILTERS as search}
        <span class="selectable pointer">{search}</span>
        {/each}
    </div>
    <div id="touchless" contenteditable bind:innerHTML={searchText} 
        on:keydown={filterInput} role="textbox" tabindex="0">
    </div>
    <button class="btn">Search</button>
</div>

<div class="searchWindow">
    Search:
</div>

<div class="position-rel bottom">
    <div class="scheduleSummary">
        
        <div class="w-100">
            <h3>Todays Appointments</h3>
        </div>
        
        <div class="w-100">
            <h3>Todays Repair Orders</h3>
        </div>
        
        <div class="w-100">
            <h3>Scheduled Techs</h3>
        </div>
    </div>
</div>