import {Collection, Get, Let, Ref, Select, Var} from "faunadb";
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
  return client.query<EncryptedData>(
    Let(
      {
        doc: Get(
          Ref(
            Collection("encrypted_data"), id)
        ),
      },
      {
        "id": Select(["ref", "id"], Var("doc")),
        "data": Select(["data", "data"], Var("doc")),
        "type": Select(["data", "type"], Var("doc")),
      }
    )
  );
};

export {
  lookupEncryptedData,
};