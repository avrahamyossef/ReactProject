const getApiSearchUrl = (searchTerm) =>
  `https://openlibrary.org/search.json?q=${searchTerm}`;

export const getBookCoverByOLID = (olid) => {
  return olid
    ? `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`
    : "https://i.ebayimg.com/images/g/UMEAAOSwYR9f~xgb/s-l500.jpg";
};

export const searchBooks = (searchTerm = "") => {
  return fetch(getApiSearchUrl(searchTerm)).then((r) => r.json());
};
