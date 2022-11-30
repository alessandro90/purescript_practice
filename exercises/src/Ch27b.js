const reverseString = s => s.split('').reverse().join('');

const reverseArray = arr => arr.map(elem => (typeof elem === 'object' ? _reverseObj(elem) : elem));

const reverseIfObject = obj =>
  Array.isArray(obj)
    ? reverseArray(obj)
    : typeof obj === 'object' && obj !== null
    ? _reverseObj(obj)
    : obj;

export const _reverseObj = obj =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [reverseString(k), reverseIfObject(v)]));
