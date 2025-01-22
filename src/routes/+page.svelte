<script lang="ts">
    import { enhance } from "$app/forms";

    let customerInfo:string;
    
</script>


<form method="post" action="/api/customers" use:enhance={({ formElement, formData, action, cancel, submitter })=>{
    return async ({ result })=>{
        formElement.reset()
    }
}}>
    <label> Plate
        <input />
    </label>
    <label for="">Name</label>
    <input type="text" name="name"/>

    <label for="">Address</label>
    <input type="text" name="address"/>

    <button class="btn btn-info"> Submit</button>
</form>
<h3>Appointments</h3>
<h3>Repair Orders</h3>