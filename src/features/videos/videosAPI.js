import axios from '../../utilitis/axios';

export const getVideos = async(tags,search,author)=>{
    let queryString ='';
    if(tags.length >0){
        queryString += tags.map(tag=>`tags_like=${tag}`).join('&');
    }
    if(author){
        queryString +=`&author_like=${author}`;
    }
    if(search){
        queryString +=`&q=${search}`;
    }
    const response = await axios.get(`/videos/?${queryString}`);

    return response.data;
}

