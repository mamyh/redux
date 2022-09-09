import axiosInstance from "../../utilities/axioxInstance";

export const getTransactions = async(type,search,limit)=>{
    // console.log('type',type,'search',search,'limit',limit);
    let query = '';
    if(type){
        query +=`&type_like=${type}`;
    }
    if(search){
        query +=`&q=${search}`;
    }
    if(limit){
        query +=`&_limit=${limit}`
    }
    // console.log('query',query);
    const response = await axiosInstance.get(`/transactions/?${query}`);
    return response.data;
}

export const  addTransaction = async (data)=>{
    const response = await axiosInstance.post('/transactions',data);
    return response.data;
}

export const editTransaction = async(id,data)=>{
    const response = await axiosInstance.put(`/transactions/${id}`,data);
    return response.data;
}

export const deleteTransaction = async (id)=>{
      await axiosInstance.delete(`/transactions/${id}`);
}
