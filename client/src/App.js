import Router from './Router/Router';
import { Provider } from 'react-redux'
import store from './Redux/store'

function App() {
  
  return (
    <div className="App"> 
        <Provider store = {store}>
          <Router/>           
        </Provider>
     
    </div>
  );
}

export default App;
