import { WorkOrderAPI } from "$lib"

export async function load({fetch}){
    let workOrders = await WorkOrderAPI.getWorkOrders(fetch, {type:"REPAIR_ORDER"})
    let appointments = await WorkOrderAPI.getWorkOrders(fetch, {type:"APPOINTMENT"})

    return {workOrders, appointments}
}