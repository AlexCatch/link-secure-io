import Joi from "joi";
import validate from "../middleware/validation";

const queryEncryptionDataSchema = Joi.object({
  id: Joi.string().required().max(255).min(5),
});

export default queryEncryptionDataSchema;
