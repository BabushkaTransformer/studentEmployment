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
}