import { Storage } from '@google-cloud/storage';

const uploadFile = async (path) => {
  const storage = new Storage({
    projectId: process.env.GCP_BUCKET_NAME,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      // https://github.com/auth0/node-jsonwebtoken/issues/642#issuecomment-585173594
      private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    },
  });

  const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);
  await bucket.upload(path);
}

export {
  uploadFile,
};