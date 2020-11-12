
/*
    This function is copied from the awnser here:
    https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    (to be clear) i did not write this function.
*/
export const generateHash = (string: string) => {
    var hash = 0, i, chr;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}