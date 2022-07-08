import './App.css';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Router from './Router/Router';

function App() {
  return (
    <div className="App">
       {/* <Router/>      */}
      <Header/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}

export default App;
