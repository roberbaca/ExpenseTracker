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

module.exports = { create, findAll };