const snakeToCamel = (str) => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const convertToCamel = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(convertToCamel);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = snakeToCamel(key);
      acc[camelKey] = convertToCamel(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
