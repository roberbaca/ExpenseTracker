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


// eliminar categoria
const deleteCategory = async (req, res) => {
  try {
      const id = Number(req.params.id);        
      const deletedCategory = await category.deleteCategoryById(id);
      res.send(deletedCategory);
  } catch(error) {
      console.log(error);
      res.statusCode = 500;
      res.send(error.message);
  }
}

// actualiza una categoria
const updateCategory = async (req, res) => {
  try {
      const id = Number(req.params.id);         
      const title = req.body.title;

      const updatedCategory = await category.editCategory(id, title);
      res.send(updatedCategory);
  } catch(error) {
      console.log(error);
      res.statusCode = 500;
      res.send(error.message);
  }
}


module.exports = { create, findAll, deleteCategory, updateCategory };