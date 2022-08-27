const applysomeDelays = (store)=>(next)=>(action)=>{
     if(action.type === "todo/todoAdded"){
        setTimeout(()=>{
            return next(action)
        },300)
        return;
     }
     return next(action);
}

const fetchAsyncMiddleware=(store)=>(next)=>async (action)=>{
    if(typeof action === "function"){
       return action(store.dispatch, store.getState);
    }
    return next(action);
}

module.exports ={
    applysomeDelays,
    fetchAsyncMiddleware
}