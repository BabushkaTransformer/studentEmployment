export const withoutEmptyProperties = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export const getFullName = (user) => {
  if (!user && !user?.name) {
    return '-';
  }

  return `${user?.lastName || ''} ${user?.firstName}`;
};

export const createKeyWords = (str) => {
  let array = [];
  for (let i = 1; i < str.length + 1; i++) {
    array.push(str.substring(0, i));
  }

  return array;
};