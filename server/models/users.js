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


const getAllUsers = async () => {
  try {
      const allUsers = await prisma.user.findMany();
      return allUsers;

  } catch (error) {
      throw new Error("Error finding users");
  }
}

// para eliminar un usuario
const deleteUserById = async (id) => {
  try {
      const deletedUser = await prisma.user.delete({
          where: {
              id: id                 
          }
      })
      return deletedUser;
  } catch(error) {
      console.log(error);
      throw new Error(error);
  }
}

module.exports = { createUser, findUserByEmail, findUserInfo, getAllUsers, deleteUserById }


