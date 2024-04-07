const Joi = require("joi");

const createClassroomValidator = Joi.object({
  name: Joi.string().required(),
  capacity: Joi.number().integer().positive().required(),
}, { timestamps: true });

const updateClassroomValidator = Joi.object({
  name: Joi.string(),
  capacity: Joi.number().integer().positive(),
})
  .or("name", "capacity")
  .required();

const createClassroom = (req, res, next) => {
  const { error } = createClassroomValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message }, { timestamps: true });
  }
  next();
};
const updateClassroom = (req, res, next) => {
  const { error } = updateClassroomValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message }, { timestamps: true });
  }
  next();
};
module.exports = { createClassroom, updateClassroom };
