/**
 * converts string to slug field that can be used to navigate
 */
export const urlify = (str: string) =>
    str.trim().toLowerCase().split(' ').join('-');
