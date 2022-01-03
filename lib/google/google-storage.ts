import { Storage, File } from '@google-cloud/storage';

/**
 * Upload a file at the given path to GCP Storage and return
 * the file name
 * @param path
 */
const uploadFile = async (path: string): Promise<string> => {
  const storage = new Storage({
    projectId: process.env.GCP_BUCKET_NAME,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      // https://github.com/auth0/node-jsonwebtoken/issues/642#issuecomment-585173594
      private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    },
  });

  const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);
  const [file] = await bucket.upload(path);
  return file.name;
}

export {
  uploadFile,
};