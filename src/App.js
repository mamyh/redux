import { Provider } from 'react-redux';
import Cards from "./components/Cards/Cards";
import Footer from "./components/footer/Footer";
import Navigation from "./components/navigation/Navigation";
import Search from "./components/Search/Search";
import store from './Redux/store';

function App() {
  return (
   <Provider store={store}>
    <Navigation />


    <Search />

    <Cards />

    <Footer />
    </Provider>
  );
}

export default App;
