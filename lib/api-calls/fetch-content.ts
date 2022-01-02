import axios from "axios";

type FetchContentPayload = {
  id: string;
  data: string;
  type: 'file' | 'text';
}

/**
 * Fetch our content from the api, this will delete the document
 * after the initial fetch
 * @param id
 */
const fetchContent = async (id: string): Promise<FetchContentPayload> => {
  const { data } = await axios.get<FetchContentPayload>(`/api/query/fetch`, { params: { id } });
  return data;
};

export default fetchContent;