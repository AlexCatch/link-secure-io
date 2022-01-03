import {NextApiRequest, NextApiResponse, NextConfig} from "next";
import nextConnect from 'next-connect';
import multipart, {NextApiRequestWithFiles} from "../../../lib/middleware/multipart";
import {uploadFile} from "../../../lib/google/google-storage";

export const config: NextConfig = {
  api: {
    bodyParser: false,
    sizeLimit: '10mb',
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

  try {
    await uploadFile(req.file.filepath);
  } catch (err) {
    console.log(err);
  }

  return res.status(200).json({ data: 'success' });
});

export default apiRoute;