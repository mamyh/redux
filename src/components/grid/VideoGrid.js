import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../features/videos/videosSlice';
import Loading from '../ui/Loading';
import Pagination from '../ui/Pagination';
import VideoItem from './VideoItem';

function VideoGrid() {
  const {videos,isLoading,isError,error,currentVideos,currentPage} = useSelector(state=>state.videos);
  const{tags,search,author} = useSelector(state=>state.filters);
  const dispatch =useDispatch();

  useEffect(()=>{
    dispatch(fetchVideos({tags,search,author}));
  },[dispatch,tags,search,author]);
  
  let content;
  if(isLoading) content = <Loading />;
  if(!isLoading && isError) content = <div className="col-span-12">{error}</div>;
  if(!isLoading &&!isError && currentVideos.length ===0) content =<div className="col-span-12">Videos not found !! </div>  ;
  if(!isLoading && !isError && currentVideos.length >0){
    content = currentVideos.map(video=><VideoItem key= {video.id} video={video} />)
  }
  return (
    <>
       <section className="pt-12">
           <div className="text-center">{`${videos?.length} videos are found`}</div>
            <section className="pt-12">
                <div
                    className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]"
                >
                 {content}
                </div>
            </section>
        </section>
        <Pagination videos={videos} currentPage={currentPage} />
    </>
  )
}

export default VideoGrid