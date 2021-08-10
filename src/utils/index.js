import { getFromLocalStorage } from "./localStorage";

export const isBookExistInCollection = (collection, bookKey) => {
  const books = collection.books;
  return books.some((item) => item.key === bookKey);
};

export const getCollectionById = (collectionId) => {
  const collection = getFromLocalStorage("collection_list");
  const collectionFound = collection.filter((c) => c.id === collectionId);
  return (collectionFound && collectionFound.length > 0)
    ? collectionFound[0]
    : [];
};
