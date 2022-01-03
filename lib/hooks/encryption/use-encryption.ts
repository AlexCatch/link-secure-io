import {useCallback} from "react";
import CryptoJS from 'crypto-js';

const keySize = 256;
const ivSize = 128;
const saltSize = 128;
const iterations = 100;

type UseEncryptionReturnType = {
  encrypt: <T extends string | Uint16Array>(data: CryptoJS.lib.WordArray | string, type: 'file' | 'text') => { keyIv: string, encryptedData: T },
  createWordArray: (buffer: ArrayBuffer) => CryptoJS.lib.WordArray,
  decrypt: (keyIv: string, encryptedData: string) => string;
};

const useEncryption = (): UseEncryptionReturnType => {
  const encrypt = useCallback(<T extends string | Uint16Array>(data: CryptoJS.lib.WordArray | string, type: 'file' | 'text') => {
    const salt = CryptoJS.lib.WordArray.random(saltSize / 8);
    const password = CryptoJS.lib.WordArray.random(keySize / 32);
    const iv = CryptoJS.lib.WordArray.random(ivSize / 8);

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations,
    });

    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    const keyIv = iv.toString() + key.toString();

    return {
      keyIv,
      encryptedData: (type == 'text' ? encrypted.toString() : new Uint16Array(encrypted.ciphertext.words)) as T,
    };
  }, []);

  const decrypt = useCallback((keyIv: string, encryptedData: string) => {
    const iv = CryptoJS.enc.Hex.parse(keyIv.substring(0, 32));
    const key = CryptoJS.enc.Hex.parse(keyIv.substring(32, 96));

    const decryptedHex = CryptoJS.AES.decrypt(encryptedData, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    return decryptedHex.toString(CryptoJS.enc.Utf8);
  }, []);


  const createWordArray = useCallback((buffer: ArrayBuffer) => {
    // It seems like there is a type conflict here so the cast to unknown is needed
    const bytes = buffer as unknown as number[];
    return CryptoJS.lib.WordArray.create(bytes);
  }, []);

  return {
    encrypt,
    decrypt,
    createWordArray,
  };
}

export default useEncryption;