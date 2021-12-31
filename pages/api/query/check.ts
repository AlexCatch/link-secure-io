import {NextApiRequest, NextApiResponse} from "next";
import {lookupEncryptedData} from "../../../lib/fauna/lookup-encrypted-data";
import validate from "../../../lib/middleware/validation";
import queryEncryptionDataSchema from "../../../lib/schemas/query-encryption-data";

/**
 * Check if a document exists for a specified ID
 * if the document is found, it hasn't been read as once fetched
 * through '/api/query/fetch' the document is deleted
 * @param req
 * @param res
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  try {
    const data = await lookupEncryptedData(id);
    return res.json({
      exists: !!data,
    });
  } catch (err) {
    let statusCode = 500;
    if (err.requestResult?.statusCode) {
      statusCode = err.requestResult.statusCode;
    }

    if (statusCode == 404) {
      return res.json({
        exists: false,
      });
    }

    return res.status(statusCode).send(null);
  }
}

export default validate({ query: queryEncryptionDataSchema }, handler);