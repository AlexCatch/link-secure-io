import CryptoJS from "crypto-js";

function verifyHMAC(hmac: string, value: string, key: string) {
  const expectedSig = CryptoJS.HmacSHA256(value, key).toString();
  return expectedSig === hmac;
}

export {
  verifyHMAC,
}