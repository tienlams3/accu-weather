import { decryptData, encryptData } from "./encrypt";

const storage = {
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

export default storage;
