import axios from '../../utilitis/axios';

export const getRelatedVideos = async({tags,id})=>{
    console.log(tags);
    const limit = 5;
    const queryString = tags?.length>0? tags.map(tag=>`tags_like=${tag}`).join('&')+`&id_ne=${id}&_limit=${limit}`: `id_ne=${id}&_limit=${limit}`;
    console.log(queryString);
    const response = await axios.get(`/videos?${queryString}`);

    return response.data;
}