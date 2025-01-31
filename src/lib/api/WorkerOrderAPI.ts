export default {
    "getWorkOrders": async function(sFetch:any, {type}:{type:"REPAIR_ORDER"|"APPOINTMENT"}) {
        let caller = sFetch ? sFetch : fetch
        try{
            return await caller(`/api/v1/tickets/?type=${type}`)
        }catch(err){
            throw new Error(`getWorkerOrder failed to retrieve work orders of type ${type}`, {cause:err})
        }
    }
}