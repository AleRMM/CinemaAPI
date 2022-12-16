const yup = require('yup');

const validationsFindByNameClassification = (req, res, next) => {
  let isValid = false;
  let message = '';

  const { type, warning } = req.query;

  const schema = yup.object().shape({
    type: yup.string().required(),
    warning: yup.string().required()
  });

  schema
    .validate({
        type,
        warning
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

module.exports = { validationsFindByNameClassification };