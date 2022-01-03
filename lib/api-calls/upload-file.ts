import axios from "axios";

/**
 * Take our locally encrypted file and post it to our endpoint
 * for creating our document
 * @param fileName
 * @param file
 */
const uploadFile = async (fileName: string, file: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file, fileName);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const { data } = await axios.post('/api/upload/file', formData, config);
  return data.id;
};

export default uploadFile;