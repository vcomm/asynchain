# asynchain
Asynchronous chain engine

### Installation

` npm install @vcomm/asynchain `

### Examples

1. Execution flat list functions combination sync/async  

```javascript
const { aChainEngine } = require('@vcomm/asynchain');

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
```

2. Cascading execution array of lists functions combination sync/async 

```javascript

const baselst = [
    asynFunc,syncFunc
]
engine.emitOn("cascade",[
    (cntx)=>console.log(`: Run sync func: Prepare Cascade`,++cntx.num),
    baselst,
    async (cntx)=>{
        const promise = new Promise((resolve,reject) => {
            setTimeout(() => resolve(cntx), 1000)
        })
        const data = await promise
        console.log(`: Run async/await func: `,++cntx.num);         
    },
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

engine.emitEvent("cascade",{num:100})
```