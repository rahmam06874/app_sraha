import Joi from "joi";

export const sendMessageSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required(),
  receiverId: Joi.string().hex().length(24).required() // التأكد إن الـ ID الخاص بـ MongoDB صحيح
});