import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { reset } from '../../features/filters/filtersSlice';
import { fetchTags } from '../../features/tags/tagsSlice';
import TaglistItem from './TaglistItem';

const Taglists = () => {
  const {tags}= useSelector(state=>state.tags); 
  const dispatch = useDispatch();
  

  useEffect(()=>{
    dispatch(fetchTags())
  },[dispatch]);
  
 const handleReset=()=>{
    dispatch(reset());
 }

  return(
    <section>
        
        <div
            className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto"
        >
          {tags?.length >0 && tags.map(tag=><TaglistItem key={tag.id} title={tag.title} />)}

          <div className="ml-auto bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer" onClick={handleReset}>Reset</div>
            
        </div>
       
    </section>)

}

export default Taglists