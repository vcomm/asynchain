
//const aChainEngine = require('../src/achainengine')
const  { aChainEngine }  = require('../index')

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

const engine = new aChainEngine()
let evlist = engine.emitOn("test",[
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
],{num:10}) 
console.log(`: Event List`,evlist);
engine.emitEvent("test",{num:50})

//    setTimeout(()=>engine.emitEvent("test"),5000)