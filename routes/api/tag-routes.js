const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags and include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  .then((dbTagData) => res.json({message: 'All tags', data: dbTagData}))
  .catch((err) => {
    console.log(err);
    res.status(500).json({error: err.message});
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `and include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  .then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({message: 'No tag found with this id'});
    } 
    res.json({message: 'Tag found', data: dbTagData}); 
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({error: err.message});
  });
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((dbTagData) => res.json({message: 'Tag created', data: dbTagData}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({error: err.message});
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update( 
    {tag_name: req.body.tag_name},
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({message: 'No tag found with this id'});
    } 
    res.json({message: 'Tag updated', data: dbTagData}); 
  }))
  .catch((err) => {
    console.log(err);
    res.status(500).json({error: err.message});
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({message: 'No tag found with this id'});
    } 
    res.json({message: 'Tag deleted', data: dbTagData}); 
    }  
  ))
  .catch((err) => {
    console.log(err);
    res.status(500).json({error: err.message});
  });
});

module.exports = router;
