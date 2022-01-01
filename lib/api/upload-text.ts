import axios from "axios";

/**
 * Take our locally encrypted text and post it to our api endpoint
 * for creating our document
 * @param text
 */
const uploadText = async (text: string): Promise<string> => {
  const { data } = await axios.post('/api/upload/text', {
    text,
  });
  return data.id;
};

export default uploadText;