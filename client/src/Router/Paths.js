import Home from "../pages/Home/Home"
import Dashboard from "../pages/Dashboard/Dashboard"

export const PATHS = {
    
    // rutas que se puede acceder solo SI el usuario esta logueado
    private: [
        {
            path: '/dashboard',            
            element: <Dashboard/>
        }       
    ],

    
    // rutas a las que puede acceder el usuario que NO esta logueado
    noLoggedIn: [
        {
            path: '/',            
            element: <Home/>
        },
       
        {
            path: '*',           
            element: <Home/>
        },

    ],    
}