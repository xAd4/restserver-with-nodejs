const collectionAllowed = (collection = "", collections = []) => {
  const includeCollection = collections.includes(collection);
  if (!includeCollection) {
    throw new Error(
      `Collction ${collection} is not allowed. Collections allowed are ${collections}`
    );
  }
  return true;
};

module.exports = collectionAllowed;
