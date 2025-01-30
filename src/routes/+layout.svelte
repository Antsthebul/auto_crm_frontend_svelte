<style lang="scss">
    @import "../app.css";

    #page{
        width:100%;
    }
</style>
<script lang="ts">
    import { SideNav } from "$lib";

</script>
<div id="page">

    <div class="w-20">
        
        <SideNav />
    </div>
    <slot></slot>
</div>
