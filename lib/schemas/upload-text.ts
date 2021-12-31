import Joi from "joi";

const uploadTextSchema = Joi.object({
  text: Joi.string().required().max(5000),
});

export default uploadTextSchema;
