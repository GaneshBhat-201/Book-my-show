/**
 * Function to set data in localstorage
 *
 * @param key - Name of the data
 * @param value - Value ot the data
 */
export const setToken = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

/**
 * Function to get data from the localstorage
 *
 * @param key - Key name of the data
 */
export const getToken = (key: string) => localStorage.getItem(key);

/**
 * Function to remove specific key from localstorage
 */
export const removeToken = (key: string) => {
    localStorage.removeItem(key);
};
