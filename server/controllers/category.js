const category = require("../models/category");

// crear categoria
const create = async (req, res) => {
  try {
    const title = req.body.title;
    const newCategory = await category.create(title);
    res.send(newCategory);

  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send(error.message);
  }
};

// muestra todas las categorias
const findAll = async (req, res) => {
  try {
    const allCategories = await category.findAll();
    res.send(allCategories);

  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};

module.exports = { create, findAll };