const prisma = require("../utils/client");

// crear una categoria
const create = async (title) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        title: title,
      },
    });
    return newCategory;

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// ver todas las categorias
const findAll = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// para eliminar una categoria
const deleteCategoryById = async (id) => {
  try {
      const deletedCategory = await prisma.category.delete({
          where: {
              id: id                 
          }
      })
      return deletedCategory;
  } catch(error) {
      console.log(error);
      throw new Error(error);
  }
}

// para actualizar una categoria
const editCategory = async (id, title ) => {
  try {
      const category = await prisma.category.update({
          where: {
              id: id
          },
          data: {                            
              title: title,           
          }
      })
      return category;
  } catch(error) {
      console.log(error);
      throw new Error(error);
  }
}


module.exports = { create, findAll, deleteCategoryById, editCategory };