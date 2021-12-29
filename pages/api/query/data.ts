import {NextApiRequest, NextApiResponse} from "next";

import {lookupEncryptedData} from "../../../lib/fauna/lookup-encrypted-data";
import validate from "../../../lib/middleware/validation";
import queryEncryptionDataSchema from "../../../lib/schemas/query-encryption-data";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  try {
    const data = await lookupEncryptedData(id);
    return res.json(data);
  } catch (err) {
    let statusCode = 500;
    if (err.requestResult?.statusCode) {
      statusCode = err.requestResult.statusCode;
    }
    return res.status(statusCode).send(null);
  }
}

export default validate({ query: queryEncryptionDataSchema }, handler);