// src/modules/users/schemas/userSchemas.ts
import Joi from 'joi';

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  birth: Joi.date().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  cep: Joi.string().length(8).required(),
  qualified: Joi.string().valid('sim', 'não').required(),
  patio: Joi.string().optional(),
  complement: Joi.string().optional(),
  neighborhood: Joi.string().optional(),
  locality: Joi.string().optional(),
  uf: Joi.string().length(2).optional(),
});

export { createUserSchema };
