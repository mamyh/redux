import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath:'todosapi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://lwstodosserverwithmamun.herokuapp.com/'
    }),
    tagTypes:["todos"],
    endpoints:(builder)=>({
        getTodos: builder.query({
            query:()=>'/todos',
            providesTags:["todos"],
            keepUnusedDataFor:1000
        }),
        addTodo: builder.mutation({
            query:(data)=>({
                url:'/todos',
                method:'POST',
                body:data
            }),
            invalidatesTags:["todos"]
        }),
        editTodo: builder.mutation({
            query:({id,data})=>({
                url:`/todos/${id}`,
                method:'PATCH',
                body:data
            }),
            invalidatesTags:["todos"]
        }),
        deleteTodo: builder.mutation({
            query:(id)=>({
                url:`/todos/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:["todos"],
        })
    }),

})

export const {useGetTodosQuery,useAddTodoMutation,useDeleteTodoMutation,useEditTodoMutation} = apiSlice;