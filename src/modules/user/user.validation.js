import Joi from "joi";

export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
  phone: Joi.string().optional()
});