import { Provider } from "react-redux";
import Main from "./components/main/Main";
import Navbar from "./components/Navbar";
import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <div className="grid place-items-center bg-blue-100  px-6 font-sans">
                <Navbar />

                <Main />
            </div>
        </Provider>
    );
}

export default App;
