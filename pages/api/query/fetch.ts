import {NextApiRequest, NextApiResponse} from "next";

import {lookupEncryptedData} from "../../../lib/fauna/lookup-encrypted-data";
import validate from "../../../lib/middleware/validation";
import queryEncryptionDataSchema from "../../../lib/schemas/query-encryption-data";
import deleteEncryptedData from "../../../lib/fauna/delete-encrypted-data";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  try {
    const data = await lookupEncryptedData(id);
    // Once fetched, delete the document
    await deleteEncryptedData(data.id);
    return res.json(data);
  } catch (err) {
    console.error(err);
    let statusCode = 500;
    if (err.requestResult?.statusCode) {
      statusCode = err.requestResult.statusCode;
    }
    return res.status(statusCode).send(null);
  }
}

export default validate({ query: queryEncryptionDataSchema }, handler);