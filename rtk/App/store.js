const configureStore = require('@reduxjs/toolkit').configureStore;
const { getDefaultMiddleware } = require('@reduxjs/toolkit');
const counterReducer = require('./../features/counter/counterSlice');
const dynamicReducer = require('./../features/dynamicCounterSlice/dynamicCounterSlice');
const postReducer = require('../features/post/postSlice'); 
const{createLogger} =require('redux-logger')
const logger = createLogger();
//configure store
const store = configureStore({
    reducer:{
        counter:counterReducer,
        dynamic:dynamicReducer,
        posts: postReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
});
module.exports = store;