const { dispatch } = require('./App/store');
const store  = require('./App/store');
const {counterActions} = require('./features/counter/counterSlice');
const {dynamicCounterActions} = require('./features/dynamicCounterSlice/dynamicCounterSlice');
const { fetchPosts } = require('./features/post/postSlice');
store.subscribe(()=>{
    //console.log(store.getState());
})

//dispatch actins
//  store.dispatch(counterActions.increment())
//  store.dispatch(counterActions.increment())
//  store.dispatch(counterActions.decrement())
// store.dispatch(dynamicCounterActions.increment(2))
//  store.dispatch(dynamicCounterActions.increment(5))
//  store.dispatch(dynamicCounterActions.decrement(8))
store.dispatch(fetchPosts());