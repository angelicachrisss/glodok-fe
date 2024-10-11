export const getStorage = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null; // or a default value
};

export const setStorage = (key, val) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, val);
  }
};

export const deleteStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const clearStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};
