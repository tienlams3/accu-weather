export default {
  set: (name: string, value: string) => {
    localStorage.setItem(name, value);
  },

  get: (name: string) => {
    return localStorage.getItem(name);
  },

  remove: (name: string) => {
    localStorage.removeItem(name);
  },
};
