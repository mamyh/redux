import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedVideos } from '../../../features/relatedVideos/relatedVideosSlice';
import Loading from '../../ui/Loading';
import RelatedVideosItem from './RelatedVideosItem';


const RelatedVideos = ({videoId,tags}) => {
  const {relatedVideos,isLoading,isError,error} = useSelector(state=>state.relatedVideos)
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(fetchRelatedVideos({tags,id:videoId}))
  },[dispatch,tags,videoId]);
  
  console.log(relatedVideos);
  let content =null
  if(isLoading) content = <Loading />
  if(!isLoading && isError) content = <div className="col-span-12">{error}</div>
  if(!isLoading && !isError&& relatedVideos?.length ===0) content = <div className="col-span-12">No video found on this url !!</div>
  if(!isLoading && !isError && relatedVideos?.length  > 0) content =  relatedVideos.map(video=> <RelatedVideosItem video={video} key={video.id} />)
  return (
                    <div
                        className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto"
                    >
                        {content}
                    </div>
  )
}

export default RelatedVideos