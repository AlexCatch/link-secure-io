import {useCallback} from "react";
import fetchContent from "../api-calls/fetch-content";
import useEncryption from "./encryption/use-encryption";
import useHMAC from "./encryption/use-hmac";

const useTextData = () => {
  const { decrypt } = useEncryption();
  const { validateHMAC } = useHMAC();
  const fetchText = useCallback(async (id: string, token: string, verifyToken: string) => {
    const { data } = await fetchContent(id);

    if (!validateHMAC(verifyToken, id, token)) {
      return null;
    }

    return decrypt(token, data);
  }, [decrypt, validateHMAC]);

  return {
    fetchText
  };
}

export default useTextData;