import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionsAPI";

const initialState={
    transactions :[],
    isLoading:false,
    isError:false,
    error:'',
    edited:{},
    search:'',
    type:'',
    currentPage:1,
    currentTransactions:[]
}

//async thunks

export const  fetchTransactions = createAsyncThunk("transactions/fetchTransactions",async({type,search,limit}={})=> await getTransactions(type,search,limit));

export const createTransaction= createAsyncThunk("transactions/createTransaction", async (data)=> await addTransaction(data));

export const updateTransaction = createAsyncThunk("transactions/updateTransaction", async({id,data})=>await editTransaction(id,data));
export const removeTransaction = createAsyncThunk("transactions/removeTransaction", async(id)=> await deleteTransaction(id));

const transactionsSlice = createSlice({
    name:"transactions",
    initialState,
    reducers:{
       startEdit:(state,action)=>{
         state.edited = action.payload;
       },
       setType:(state , action) =>{
        console.log(action);
        state.type = action.payload;
       },
       setSearch:(state,action)=>{
        state.search =action.payload;
       },
       changedPage:(state,action)=>{
        let startIndex = 10 *(action.payload -1);
        let endIndex = 10 * action.payload;
        state.currentPage = action.payload;
        state.currentTransactions = state.transactions.slice(startIndex,endIndex);
       }
    },
    extraReducers:(binder)=>{
        binder.addCase(fetchTransactions.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchTransactions.fulfilled , (state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.transactions = action.payload;
            state.currentTransactions = action.payload.slice(0,10);
            state.currentPage =1;
        })
        .addCase(fetchTransactions.rejected,(state,action)=>{
            state.isLoading =false;
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(createTransaction.pending, (state)=>{
            state.isLoading=true;
            state.isError =false;
        })
        .addCase(createTransaction.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError = false;
            state.transactions.push(action.payload);
        })
        .addCase(createTransaction.rejected,(state,action)=>{
            state.isLoading =false;
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(updateTransaction.pending, (state)=>{
            state.isLoading=true;
            state.isError =false;
        })
        .addCase(updateTransaction.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError = false;
            state.edited ={};
            const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id);
            if(indexToUpdate !==-1){
                state.transactions[indexToUpdate] = action.payload;
            }
        })
        .addCase(updateTransaction.rejected,(state,action)=>{
            state.isLoading =false;
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(removeTransaction.pending, (state)=>{
            state.isLoading=true;
            state.isError =false;
        })
        .addCase(removeTransaction.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError = false;
            state.transactions = state.transactions.filter(transaction=>transaction.id !== action.meta.arg);
        })
        .addCase(removeTransaction.rejected,(state,action)=>{
            state.isLoading =false;
            state.isError = true;
            state.error = action.error.message;
        })
    }    
})

export default transactionsSlice.reducer;
export const{startEdit,setSearch,setType,changedPage} = transactionsSlice.actions