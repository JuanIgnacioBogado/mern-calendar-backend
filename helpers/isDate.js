const dateIsValid = date => date instanceof Date && !isNaN(date);

export const isDate = value => {
  if (!value) return false;

  const date = new Date(value);
  return dateIsValid(date);
};
