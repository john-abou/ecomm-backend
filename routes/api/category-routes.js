const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try { 
    const dbCatData = await Category.findAll(
      {
        include: {
          Model: Product,
          attributes: ['product_name', 'price', 'stock', 'category_id']
        }
      }
    )
    if (!dbCatData) {
      res.status(404).json({message: 'No categories found'})
    }
    res.json({message: 'All categories', data: dbCatData})
  }
  catch {
    res.status(500).json({message: 'Server error'})
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const catData = await Category.findByPk(req.params.id, {
      include: {
        Model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    })
    if (!catData) {
      res.status(404).json({message: 'No category found with this id'})
    }
    res.json({message: 'Category found', data: catData})
  }
  catch {
    res.status(500).json({message: 'Server error'})
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catData = await Category.create({category_name: req.body.category_name})
    if (!catData) {
      res.status(404).json({message: 'No category found with this id'})
      }
      res.status(200).json({ message: 'Category created' }) 
    }
  catch {
    res.status(500).json({message: 'Server error'})
    }
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    if (!catData) {
      res.status(404).json({message: 'No category found with this id'})
    }
    res.status(200).json({message: 'Category updated', data: catData})
  }
  catch {
    res.status(500).json({message: 'Server error'})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!catData) {
      res.status(404).json({message: 'No category found with this id'})
    }
    res.status(200).json({message: 'Category deleted', data: catData})
  }
  catch {
    res.status(500).json({message: 'Server error'})
  }
});

module.exports = router;
