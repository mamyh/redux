import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tagAdded, tagRemoved } from '../../features/filters/filtersSlice';

const TaglistItem = ({title}) => {
  const {tags}=useSelector(state=>state.filters);
  const dispatch = useDispatch();
  const isSelected = tags.includes(title);
  const style =isSelected?"bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer":"bg-blue-100 text-blue-600 px-4 py-1 rounded-full cursor-pointer"
  const handleSelected =()=>{
    if(isSelected){
      dispatch(tagRemoved(title))
    }else{
      dispatch(tagAdded(title))
    }
  }
  return (
    <div onClick={handleSelected} className={style}>
    {title}
</div>


  )
}

export default TaglistItem

