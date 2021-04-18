
//const asynChain = require('../src/asynchain')
const  { asynChain }  = require('../index')

async function asynFunc(cntx)  {
    const promise = new Promise((resolve,reject) => {
        setTimeout(() => resolve(cntx), 1000)
    })
    const data = await promise
    console.log(`: Run async/await func: `,++cntx.num);        
}    
function syncFunc(cntx) {
    console.log(`: Run sync func: `,++cntx.num);
}

const chain = new asynChain([
    (cntx)=>console.log(`: Run sync func: Initial`,++cntx.num),
    asynFunc,syncFunc,
    (cntx)=>{ console.log(`: Run sync func: Anominus`,++cntx.num); },
    async (cntx)=>{
        return new Promise(resolve => {
            setTimeout(() => resolve(cntx), 1000)
        })
        .then(data => {
            console.log(`: Run async func: Anominus`,++cntx.num);
        }) 
    }
])

chain.queuecall({num:50},()=>{
    console.log(`: Finish : `);
},true)