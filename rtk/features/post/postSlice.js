const { createAsyncThunk } = require('@reduxjs/toolkit');
const { default: fetch } = require('node-fetch');

const createSlice = require('@reduxjs/toolkit').createSlice;

//initial state
const initialState = {
    loading:false,
    error:'',
    posts:[]
};
const fetchPosts =createAsyncThunk("posts/fetch",async()=>{
       const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
       const posts = await response.json();
       return posts;
})
const postSlice = createSlice({
    name:"post",
    initialState,
    extraReducers:(binder)=>{
            binder.addCase(fetchPosts.pending,(state,action)=>{
                  state.loading = true;
                  state.error= '';
                  state.posts=[]
            });
            binder.addCase(fetchPosts.fulfilled,(state,action)=>{
                state.loading = false;
                state.error = '';
                state.posts = action.payload;
            })
            binder.addCase(fetchPosts.rejected, (state,action)=>{
                action.loading= false;
                state.error =action.error.message;
                state.posts = []
            })
    },  
});

module.exports = postSlice.reducer;
module.exports.fetchPosts = fetchPosts;