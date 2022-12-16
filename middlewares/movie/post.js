const yup = require('yup');

const validationsCreateMovie = (req, res, next) => {
  let isValid = false;
  let message = '';

  const {
    title,
    classification,
    duration,
    category,
    sinopsis,
    actor,
    director,
    schedule,
  } = req.body;

  const schema = yup.object().shape({
    title: yup.string().required(),
    classification: yup.string().required(),
    duration: yup.string().required().positive(),
    category: yup.string().required(),
    sinopsis: yup.string().required(),
    actor: yup.string().required(),
    director: yup.string().required(),
    schedule: yup.date().required()
  });

  schema
    .validate({
        title,
        classification,
        duration,
        category,
        sinopsis,
        actor,
        director,
        schedule,
    })
    .then((valid) => {
      isValid = valid;
    })
    .catch((err) => {
      message = err;
    })
    .then(() => {
      if (isValid) {
        next();
      } else {
        res.send({
          error: {
            type: message.name,
            message: message.errors[0],
          },
        });
      }
    });
};

module.exports = { validationsCreateMovie };
