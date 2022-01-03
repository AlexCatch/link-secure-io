import {Collection, Create, Time} from "faunadb";
import {DateTime} from "luxon";
import client from "./client";

type CreatedFileData = {
  ref: {
    id: string
  },
  ts: number,
  data: { data: string, type: 'file', fileName: string },
}

/**
 * Create a 'file' type document in the encrypted_data collection
 * @param originalFileName
 * @param gcpStorageFileName
 */
const createFile = async (originalFileName: string, gcpStorageFileName: string): Promise<string> => {
  const { ref } = await client.query<CreatedFileData>(
    Create(
      Collection('encrypted_data'),
      {
        data: {
          fileName: originalFileName,
          data: gcpStorageFileName,
          type: "file",
        },
        ttl: Time(DateTime.utc().plus({ days: 1 }).toISO()),
      }
    )
  );
  return ref.id;
};

export default createFile;