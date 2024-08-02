const getItemFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

const setItemInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const removeItemFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { getItemFromLocalStorage, setItemInLocalStorage, removeItemFromLocalStorage };
