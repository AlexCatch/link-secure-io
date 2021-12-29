import FaunaDB from 'faunadb';


const client = new FaunaDB.Client({
  secret: process.env.FAUNA_DB_KEY,
  domain: process.env.FAUNA_DB_REGION,
});

export default client;