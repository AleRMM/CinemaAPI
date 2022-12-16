const express = require('express');

const router = express.Router();
const { validationsCreateClassification } = require('../middlewares/classification');
const { Classification } = require('../models/classification');

// Create
router.post('/', validationsCreateClassification, (req, res) => {
  const classification = new Classification();
  classification.type = req.body.type;
  classification.warning = req.body.warning;

  Classification.save((error, classificationStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }
    res.status(201).send({ origin: classificationStored });
  });
});

// Find by id
router.get('/:id', (req, res) => {
  Classification.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find by name
router.get('/find', (req, res) => {
  Classification.find({ name: req.query.name }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find all
router.get('/find/all', (req, res) => {
  Classification.find({}, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Update
router.patch('/update', (req, res) => {
  const key = Object.keys(req.query)[0];
  Classification.findOneAndUpdate(
    { [key]: req.query[key] }, // Valor buscado
    { [key]: req.body.value }, // Nuevo valor
    (err, docs) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({ data: docs });
      }
    }
  );
});

// Delete by id
router.delete('/:id', (req, res) => {
  Classification.deleteOne(
    { _id: req.params.id },

    (err, docs) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send({ data: docs });
      }
    }
  );
});

module.exports = router;