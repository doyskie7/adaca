import Joi from "joi";

const createUserSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  contact: Joi.string().required(),
});

const getSingleUserSchema = Joi.object({
    id:Joi.number()?.required()
})

module.exports = {
  createUserSchema,
  getSingleUserSchema
};
