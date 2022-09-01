import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchVideo } from '../../features/video/videoSlice'
import Loading from '../ui/Loading'
import Description from '../Video/Description/Description'
import Player from '../Video/Player'
import RelatedVideos from '../Video/relatedVideos/RelatedVideos'

const Video = () => {
  const {video,isLoading,isError,error} = useSelector(state=>state.video);
  const {videoId}=useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(fetchVideo(videoId));
  },[dispatch,videoId]);

  const {id,link,title,tags} = video ||{};
  let content = null;
  if(isLoading) content = <Loading />
  if(!isLoading && isError) content = <div className="col-span-12">{error}</div>
  if(!isLoading && !isError&& !video?.id) content = <div className="col-span-12">No video found on this url !!</div>
  if(!isLoading && !isError && video?.id) content = <div className="grid grid-cols-3 gap-2 lg:gap-8">
                                                      <div className="col-span-full w-full space-y-8 lg:col-span-2">
                                                          <Player link={link} title={title} />

                                                          <Description video={video}/>
                                                      </div>

                                                      <RelatedVideos videoId={id} tags={tags} />
                                                    </div>
  return (
    <section className="pt-6 pb-20">
    <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        {content}
    </div>
</section>
  )
}

export default Video