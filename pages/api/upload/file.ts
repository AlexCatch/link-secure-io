import {NextApiRequest, NextApiResponse, NextConfig} from "next";
import nextConnect from 'next-connect';
import multipart, {NextApiRequestWithFiles} from "../../../lib/middleware/multipart";
import {uploadFile} from "../../../lib/google/google-storage";
import createFile from "../../../lib/fauna/create-file";

export const config: NextConfig = {
  api: {
    bodyParser: false,
    sizeLimit: '10.1mb',
  },
};

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(multipart);

apiRoute.post(async (req: NextApiRequestWithFiles, res) => {
  if (!req.file) {
    return res.status(400).json(null);
  }

  const file = req.file;

  try {
    const uploadedFileName = await uploadFile(file.filepath);
    const createdIdentifier = await createFile(file.originalFilename, uploadedFileName);
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
});

export default apiRoute;