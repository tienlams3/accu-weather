import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

export const encryptData = (data: string) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
  return ciphertext;
};

export const decryptData = (ciphertext: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};
