import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthCheck } from "./hooks/useAuthCheck";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Private from "./Route/Private";
import Public from "./Route/Public";

function App() {
    const isAuth = useAuthCheck();
    
    return !isAuth ? <div>Checking Authentication ...</div> :(
        <Router>
            <Routes>
                <Route path="/" element={<Public><Login /> </Public>} />
                <Route path="/register" element={<Public><Register /></Public>} />
                <Route path="/inbox" element={<Private><Conversation /></Private>} />
                <Route path="/inbox/:id" element={<Private><Inbox /></Private>} />
            </Routes>
        </Router>
    ) ;
}

export default App;
