let productCount = 0

// Simulate that the API works for 2 seconds
export default async()=>{

    await new Promise<any>((resolve)=> {
        setTimeout( ()=> {
            resolve(productCount++);
        }, 2000)
    })

    return {
        productCount,
    };
};