export const generateInitialName = (firstName, lastName) => {
  const temp = `${firstName[0] || ''}${lastName[0] || ''}`;
  return temp;
};

export const isValidUrlImage = url => {
  return url?.includes('http://');
};

export const checkIsFavorite = (list, id) => {
  return list?.some(obj => obj.id === id);
};

export const transformData = data => {
  const result = [];

  data.forEach(obj => {
    const key = obj.uniqKey;
    const existingData = result.find(item => item.key === key);

    if (existingData) {
      existingData.data.push(obj);
    } else {
      result.push({key: key, data: [obj]});
    }
  });

  return result.sort((a, b) => a.key.localeCompare(b.key));
};
