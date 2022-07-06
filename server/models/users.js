const prisma = require("../utils/client");

const createUser = async (name, email, password, role) => {
  try {
    const newUser = await prisma.user.create({ 
      data: {
        name: name,
        email: email,
        password: password,
        role: role      
      }
    });
    
    return newUser;      

  } catch (error) {
    throw new Error("Error creating user");
  }
}

const findUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        return user;

    } catch (error) {
        throw new Error("Error finding user");
    }
}

const findUserInfo = async (userId) => {
  try {
      const user = await prisma.user.findUnique({
          where: {
            id: userId 
          }
      });
      return user;

  } catch (error) {
      throw new Error("Error finding user");
  }
}

module.exports = { createUser, findUserByEmail, findUserInfo }


