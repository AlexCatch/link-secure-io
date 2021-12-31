import {Collection, Create, Time} from "faunadb";
import {DateTime} from "luxon";
import client from "./client";

type CreatedTextResult = {
  ref: {
    id: string
  },
  ts: number,
  data: { data: string, type: 'text' },
}

/**
 * Create a 'text' type document in the encrypted_data collection
 * @param text
 */
const createText = async (text: string): Promise<string> => {
  const { ref } = await client.query<CreatedTextResult>(
    Create(
      Collection('encrypted_data'),
      {
        data: {
          data: text,
          type: "text",
        },
        ttl: Time(DateTime.utc().plus({ days: 1 }).toISO()),
      }
    )
  );
  return ref.id;
};

export default createText;