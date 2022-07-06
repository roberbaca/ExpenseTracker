const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware para autenticar el usuario
const userLoggedIn = async (req, res, next) => {

    const tokenHeader = req.headers["authorization"];
    if(!tokenHeader) {
        res.status(401).json({message: "Unauthorized, provide a token"});      
        return;
    }
    
    const token = tokenHeader.split(" ")[1];
    
    try {
        const data = await jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET_KEY}`)  
        req.user = {
            id: data.id,            
            email: data.email,  
            role: data.role,         
        }                 
        next();         

    } catch (e) {
        res.status(403).json({message: "Forbidden", error: e});    
        return; 
    }   
}

// middleware para autenticar el administrador
const authorizeAdmin = async (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader) {
      res.status(401).json({ message: "Missing token: not authorized" });
      return;
    }
    const token = tokenHeader.split(" ")[1];
    try {
      const data = await jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET_KEY}`);
      if (data.role !== "admin") {
        res.status(403).json({ message: "Not authorized: must be admin" });
        return;
      }
      req.user = {
        id: data.id,
        email: data.email,
        role: data.role,
      };
      return next();
    } catch (e) {
      res.status(403).json({ message: "Not authorized", error: e });
      return;
    }
  };
  

module.exports = { userLoggedIn, authorizeAdmin }