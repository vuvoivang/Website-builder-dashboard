const writeToCache = (url, data) => {
  const now = new Date();
  const item = {
    value: data,
    expiry: now.getTime() + 30 * 60 * 1000,
  };
  localStorage.setItem(url, JSON.stringify(item));
};

const readFromCache = (url) => {
  const itemStr = localStorage.getItem(url);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(url);
    return null;
  }
  return item.value;
};

export { readFromCache, writeToCache };
