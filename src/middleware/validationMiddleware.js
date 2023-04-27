const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().alphanum().min(3).max(30).required(),
      text: Joi.string().min(10).max(400).required(),
    });

    validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(new ValidationError(JSON.stringify(validationResult.error.details)));
    }
    next();
  },
  patchPostValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().alphanum().min(3).max(30).optional(),
      text: Joi.string().alphanum().min(10).max(400).optional(),
    });

    validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: JSON.stringify(validationResult.error.details) });
    }
    next();
  },
};
