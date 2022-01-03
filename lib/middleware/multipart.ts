import nextConnect from 'next-connect'
import { IncomingForm, Files, File } from 'formidable';
import {NextApiRequest, NextApiResponse} from "next";

export type NextApiRequestWithFiles = NextApiRequest & {
  file: File,
}

const multipart = nextConnect();

const form = new IncomingForm({
  multiples: false,
  keepExtensions: true,
  maxFileSize: 10 * 1024 * 1024,
});

multipart.use(async (req: NextApiRequestWithFiles, res: NextApiResponse, next) => {
  form.parse(req, (err, fields, { file }) => {
    if (!err) {
      req.body = fields; // sets the body field in the request object
      req.file = file as File; // sets the files field in the request object
    }
    next(); // continues to the next middleware or to the route
  });
})

export default multipart;