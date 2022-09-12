import React from "react";
import Main from "./components/main/Main";
import Navbar from "./components/nav/Navbar";

function App() {
  return (
    <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
      <Navbar />
      <Main />
   </div>
  );
}

export default App;
