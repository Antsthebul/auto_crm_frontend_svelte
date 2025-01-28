<style>
    #touchless{
        height: 2em;
        width: 300px;
        border: 1px solid lightgrey;
        border-radius: 15px;
        margin: 0 auto;
        padding:5px;
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

    $: console.log("Input => ", searchText)

    function wrappedFilter(text:string):string{
        return `<span style="display: inline-block;
                    background-color: rgb(30, 208, 208);
                    color: rgb(255, 255, 255);
                    text-decoration: solid;
                    font-size: 1.4em;
                    padding:5px;">${text}:<span`
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
     <div id="touchless" contenteditable bind:innerHTML={searchText}></div>
</form>
<h3>Appointments</h3>
<h3>Repair Orders</h3>
<h3>Techs</h3>