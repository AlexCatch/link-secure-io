import {query} from "faunadb";
import client from "./client";

export type EncryptedData = {
  id: string;
  type: string;
  data: string;
}

/**
 * Attempt to find a piece of encrypted data from Fauna
 * @param id
 */
const lookupEncryptedData = (id: string): Promise<EncryptedData> => {
  return client.query(
    query.Let(
      {
        doc: query.Get(
          query.Ref(
            query.Collection("encrypted_data"), id)
        ),
      },
      {
        "id": query.Select(["ref", "id"], query.Var("doc")),
        "data": query.Select(["data", "data"], query.Var("doc")),
        "type": query.Select(["data", "type"], query.Var("doc")),
      }
    )
  )
};

export {
  lookupEncryptedData,
};