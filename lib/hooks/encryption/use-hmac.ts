import {useCallback} from "react";
import CryptoJS from 'crypto-js';
import {verifyHMAC} from "../../utils/hmac";

const useHMAC = () => {
  const generateHMAC = useCallback((value: string, key: string): string => {
    return CryptoJS.HmacSHA256(value, key).toString();
  }, []);

  const validateHMAC = useCallback((hmac: string, value: string, key: string): boolean => {
    return verifyHMAC(hmac, value, key);
  }, []);

  return {
    generateHMAC,
    validateHMAC,
  }
}

export default useHMAC;