const express = require('express');

const router = express.Router();
const {
  validationsCreateMovie,
  validationsFindByNameMovie,
} = require('../middlewares/movie');

const { Movie } = require('../models/movie');

// Create
router.post('/', validationsCreateMovie, (req, res) => {
  const movie = new Movie();
  movie.title = req.body.title;
  movie.classification = req.body.classification;
  movie.duration = req.body.duration;
  movie.category = req.body.category;
  movie.sinopsis = req.body.sinopsis;
  movie.actor = req.body.actor;
  movie.director = req.body.director;
  movie.schedule = req.body.schedule;

  Movie.save((error, movieStored) => {
    if (error) {
      res.status(500).send({ message: error });
    }
    res.status(201).send(movieStored);
  });
});

// Find by id
router.get('/:id', (req, res) => {
  Movie.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      res.status(404).send({ name: err.name, message: err.message });
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find by name
router.get('/find', validationsFindByNameMovie, (req, res) => {
  Movie.find({ name: req.query.name }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send({ data: docs });
    }
  });
});

// Find all
router.get('/find/all', (req, res) => {
  Movie.find({}, (err, docs) => {
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
  Movie.findOneAndUpdate(
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
  Movie.deleteOne(
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