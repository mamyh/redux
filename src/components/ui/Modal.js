import React, { useState } from 'react';
import deleteIcon from '../../assets/images/cancel.png';
import { useEditTodoMutation } from '../../features/api/apiSlice';

const Modal = ({todo,handleEdit}) => {
  const {text,color,completed,id} = todo;
  const [todoText, setTodoText] = useState(text);
  const [todoColor, setTodoColor] = useState(color);
  const [todoCompleted, setTodoCompleted] = useState(completed);
  const [editTodo,{isSuccess}]=useEditTodoMutation();

  const handleSubmit =(e)=>{
    e.preventDefault();
    editTodo({id,data:{
      text:todoText,
      completed:todoCompleted,
      color:todoColor
    }});
    if(isSuccess){
      handleEdit(false);
    }
  }

  return (
<>

<div
            className="justify-center  p-12 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
             
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Editing todo
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleEdit(false)}
                  >
                    <img
                        src={deleteIcon}
                        className=" w-4 h-4 ml-2 cursor-pointer"
                        alt="Cancel"
                        
                    />
                  </button>
                </div>
               
                  <form onSubmit={handleSubmit}>

                                      <div className=" relative flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0" >
                                            <div
                                                className="rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-green-500 focus-within:border-green-500"
                                            >
                                                <input
                                                                            type="checkbox"
                                                                            className="opacity-0 absolute rounded-full"
                                                                            value ={todoCompleted}
                                                                            onChange={()=>setTodoCompleted(check=>!check)}
                                                                            checked={todoCompleted}
                                                                        />
                                                <svg
                                                    className={`${!todoCompleted && 'hidden'} fill-current w-3 h-3 text-green-500 pointer-events-none`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                                </svg>
                                            </div>

                                            <div className={`select-none flex-1 `}>
                                                <input type="text" className='py-2 px-4 border bg-white outline-none' value={todoText} onChange={(e)=>setTodoText(e.target.value)}  />
                                            </div>
                                            
                                            <div onClick={()=>setTodoColor('green')}
                                                                        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 ${todoColor==='green'?'bg-green-500':''} `}
                                                                    ></div>

                                                                    <div onClick={()=>setTodoColor('yellow')}
                                                                        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 ${todoColor==='yellow'?'bg-yellow-500':''}`}
                                                                    ></div>

                                                                    <div onClick={()=>setTodoColor('red')}
                                                                        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 ${todoColor==='red'?'bg-red-500':''}`}
                                                                    ></div>

                                            
                                        </div>
                                

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => handleEdit(false)}
                        >
                            Close
                        </button>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                            
                        >
                            Save Changes
                        </button>
                        </div>

                  </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div></>

  )
}

export default Modal