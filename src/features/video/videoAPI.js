import axios from '../../utilitis/axios';

export const getVideo = async(id)=>{
    const response = await axios.get(`/videos/${id}`);

    return response.data;
}

export const addingLikes= async(id,data)=>{
    const response = await axios.patch(`/videos/${id}`,{
        likes:data
    },{
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    return response.data;
}

export const addingUnlikes= async(id,data)=>{
    const response = await axios.patch(`/videos/${id}`,{
        unlikes:data
    },{
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    return response.data;
}
