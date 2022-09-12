import React from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import TodosLists from './todoslists/TodosLists';

const Main = () => {
  return (
    <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
  
       <Header />
       <hr className="mt-4" />

       <TodosLists />

        <hr className="mt-4" />

       <Footer />
    
</div>
  )
}

export default Main