
class asynChain {

    constructor(funcs) {
        this._seqfuncs_ = funcs || []
        this._cloneseq_ = []
    }

    addCall(func) {
        this._seqfuncs_.push(func)
        console.debug(`Accelerate functions seq: ${func}`)
    }

    seqClone() {
        this._cloneseq_ = [...this._seqfuncs_]
    }

    seqRestore() {
        this._seqfuncs_ = [...this._cloneseq_]
    }

    async runcall(func, cntx) {            
        return (func.constructor.name === 'AsyncFunction') ? await func(cntx) : func(cntx);
    } 

    async seqcall(funcs, cntx) {
        let data = cntx
        await funcs.reduce( 
            (p, item) => p.then(
                () => this.runcall(item, data).then(
                    result => {
                        funcs.shift()
                })
            ), Promise.resolve(cntx)
        )
    }

    async queuecall(cntx,finish,restore) {
        console.log(`Execute New Queue ${this._seqfuncs_.length} calls`)
        await this.seqcall(this._seqfuncs_,cntx)
        if (restore) this.seqRestore()
        if (finish) finish()
    }
}

if (typeof module !== 'undefined' &&
    typeof module.exports !== 'undefined') {
//    module.exports.asynChain = asynChain
    module.exports = asynChain
} 