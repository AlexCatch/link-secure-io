import useTextData from "./use-text-data";
import {useCallback} from "react";

const useData = () => {
  const { fetchText } = useTextData();

  const fetchContent = useCallback(async (id: string, type: 'file' | 'text', token: string, verifyToken: string) => {
    switch (type) {
      case "file":
        return Promise.resolve();
      case "text":
        return fetchText(id, token, verifyToken);
    }
  }, [fetchText]);

  return {
    fetchContent,
  }
}

export default useData;