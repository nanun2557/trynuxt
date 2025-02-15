import data from "./products.json"

// Simulate that the API works for 2 seconds
export default defineEventHandler( async()=>{
    return new Promise<any>((resolve)=> {
        setTimeout( ()=> {
            resolve(data);
        }, 2000)
    })
});