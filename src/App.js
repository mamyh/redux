import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import AddTransaction from "./pages/AddTransaction";
import Home from "./pages/Home";

function App() {
    return (
        <div className="app">
            <Navbar />
            <Router >
                <Routes >
                    <Route path="/" element={<Home/>}  />
                    <Route path="/transactions" element={<AddTransaction />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
