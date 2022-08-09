import Router from './Router/Router';
import { Provider } from 'react-redux'
import store from './Redux/store'

/*--------------------------------------------------------------------------------
	#  EXPENSE TRACKER v1.0 - 2022
	# ------------------------------------------------------------------------------
	# Designed & coded by Roberto Baca
  # Github:   https://github.com/roberbaca/ExpenseTracker
  # linkedin: https://www.linkedin.com/in/roberto-baca/
	# Website:  https://robertobaca-90035.web.app/
  # Email:    roberto.nicolas.baca@gmail.com
---------------------------------------------------------------------------------- */


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
