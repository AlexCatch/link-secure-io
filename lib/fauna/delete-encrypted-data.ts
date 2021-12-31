import { Collection, Delete, Ref } from "faunadb";
import client from "./client";

/**
 * delete a document in the encrypted_data collection
 * @param id
 */
const deleteEncryptedData = (id: string): Promise<void> => {
 return client.query(
   Delete(
     Ref(
       Collection(
         'encrypted_data'
       ), id
     ),
   ),
 );
};

export default deleteEncryptedData;