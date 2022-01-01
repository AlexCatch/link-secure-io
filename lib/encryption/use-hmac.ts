import {useCallback} from "react";
import CryptoJS from 'crypto-js';

const useHMAC = () => {
  const generateHMAC = useCallback((value: string, key: string): string => {
    return CryptoJS.HmacSHA256(value, key).toString();
  }, []);

  const validateHMAC = useCallback((hmac: string, value: string, key: string): boolean => {
    const expectedSig = CryptoJS.HmacSHA256(value, key).toString();
    return expectedSig === hmac;
  }, []);

  return {
    generateHMAC,
    validateHMAC,
  }
}

export default useHMAC;