import {NextApiRequest, NextApiResponse} from "next";
import validate from "../../../lib/middleware/validation";
import uploadTextSchema from "../../../lib/schemas/upload-text";
import createText from "../../../lib/fauna/create-text";

type HandlerRequestBody = {
  text: string;
}

/**
 * Take our encrypted text value, generate a UUID
 * and return that
 * @param req
 * @param res
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text }: HandlerRequestBody = req.body;

  try {
    const createdIdentifier = await createText(text.trim());
    return res.json({
      id: createdIdentifier,
    });
  } catch (err) {
    console.error(err);
    let statusCode = 500;
    if (err.requestResult?.statusCode) {
      statusCode = err.requestResult.statusCode;
    }
    return res.status(statusCode).send(null);
  }
}

export default validate({ body: uploadTextSchema }, handler);