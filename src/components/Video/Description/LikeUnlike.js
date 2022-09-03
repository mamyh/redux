import React from 'react';
import { useDispatch } from 'react-redux/es/exports';
import likeIcon from '../../../assets/like.svg';
import unlikeIcon from '../../../assets/unlike.svg';
import { updateLike, updateUnlike } from '../../../features/video/videoSlice';

const LikeUnlike = ({videoId,likes,unlikes}) => {
//   const video =  useSelector(state=>state.video);
  const dispatch = useDispatch();
  
//   const {likes,unlikes} = video;
//   useEffect(()=>{
//     dispatch(fetchVideo(videoId))
//   },[dispatch,videoId]);

//   const dataUnlike = unlikes +1
 
  const handleLike = ()=>{
    const dataLike = likes+1;
    dispatch(updateLike({videoId,dataLike}));
  }
  const handleUnlike =()=>{
      const dataUnlike = unlikes+1;
      dispatch(updateUnlike({videoId,dataUnlike}))
  }
  return (
    <div className="flex gap-10 w-48">
    <div className="flex gap-1">
        <div className="shrink-0" onClick={handleLike}>
            <img
                className="w-5 block"
                src={likeIcon}
                alt="Like"
            />
        </div>
        <div
            className="text-sm leading-[1.7142857] text-slate-600"
        >
            {likes}
        </div>
    </div>
    <div className="flex gap-1">
        <div className="shrink-0" onClick={handleUnlike}>
            <img
                className="w-5 block"
                src={unlikeIcon}
                alt="Unlike"
            />
        </div>
        <div
            className="text-sm leading-[1.7142857] text-slate-600"
        >
            {unlikes}
        </div>
    </div>
</div>
  )
}

export default LikeUnlike