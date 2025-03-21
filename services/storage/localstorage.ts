import { decryptData, encryptData } from "./encrypt";

export default {
  set: (name: string, value: string) => {
    const data = encryptData(value);
    localStorage.setItem(name, data);
  },

  get: (name: string) => {
    const data = localStorage.getItem(name);
    if (data) return decryptData(data);
    return null;
  },

  remove: (name: string) => {
    localStorage.removeItem(name);
  },
};
