import React from 'react';
import { useDispatch } from 'react-redux';
import { articleSearch, authorSearch } from '../../../Redux/cards/actions';

const Card = ({card}) => {
  const dispatch = useDispatch()
  const {image,articles,title,author,postTime,readTime} = card;
  const articleHandler=(article)=>{
    dispatch(articleSearch(article));
  }
  const authorHandler=(authorName)=>{
    dispatch(authorSearch(authorName));
  }
  return (
    <div
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                    <div className="flex-shrink-0">
                        <img
                            className="h-48 w-full object-cover"
                            src={image}
                            alt=""
                        />
                    </div>

                    <div
                        className="flex-1 bg-white p-6 flex flex-col justify-between"
                    >
                        <div className="flex-1">
                            
                                <p  className="text-sm font-medium text-indigo-600">
                                {articles.map(article=> (
                                <span key={Math.random()} onClick={()=>articleHandler(article)}
                                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                                >
                                    {article}
                                </span>
                                 ))}
                            </p>
                           
                            <a href="jghjk" className="block mt-1">
                                <p
                                    className="text-xl font-semibold text-gray-900"
                                >
                                    {title}
                                </p>
                            </a>
                        </div>
                        <div className="mt-6 flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={author.image}
                                    alt=""
                                    onClick={()=>authorHandler(author.name)}
                                />
                            </div>
                            <div className="ml-3">
                                <p onClick={()=>authorHandler(author.name)}
                                    className="text-sm font-medium text-gray-900 hover:underline"
                                >
                                    {author.name}
                                </p>
                                <div
                                    className="flex space-x-1 text-sm text-gray-500"
                                >
                                    <time dateTime="2020-03-16"
                                        >{new Date(postTime).toString('YYYY-MM-DD').slice(4,15)}
                                    </time>
                                    <span aria-hidden="true">
                                        &middot;
                                    </span>
                                    <span> {readTime} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default Card