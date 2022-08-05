import Home from "../pages/Home/Home"
import Dashboard from "../pages/Dashboard/Dashboard"
import Admin from "../pages/Admin/Admin"

export const PATHS = {
    
    // rutas que se puede acceder solo SI el usuario esta logueado
    private: [
        {
            path: '/user/dashboard',            
            element: <Dashboard/>
        },      
        
        {
            path: '/home',            
            element: <Home/>
        },  
        
        {
            path: '*',            
            element: <Home/>
        },      
    ],

    
    // rutas a las que puede acceder el usuario que NO esta logueado
    noLoggedIn: [        

        {
            path: '/home',            
            element: <Home/>
        },   
        
        {
            path: '*',            
            element: <Home/>
        },        
        
    ],    

    // rutas a las que puede acceder con credenciales de administrador
    admin: [
        {
            path: '/admin/dashboard',            
            element: <Admin/>
        },
        
        {
            path: '/home',            
            element: <Home/>
        },  
        
        {
            path: '*',            
            element: <Home/>
        },      
    ],

}