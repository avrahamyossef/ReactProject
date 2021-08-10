import React, { useState, useRef, useEffect } from "react";
import * as classes from "./search.module.scss";
import FullPageLoader from "../../components/FullPageLoader/index";
import { searchBooks } from "../../booksApi/index";
import ResultsNotFound from "../../components/ResultsNotFound/index";
import BooksList from "../../components/Books/BooksList/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  saveOnLocalStorage,
  getFromLocalStorage,
} from "../../utils/localStorage";

const SearchPage = () => {
  const [showFullPageLoader, setFullPageLoaded] = useState(true);
  const [booksList, setBooksList] = useState([]);
  const [alreadySearch, setAlreadySearch] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    const booksListFromStorage = getFromLocalStorage("books_list");
    const searchInputFromStorage = getFromLocalStorage("search_input");

    if (booksListFromStorage) {
      setAlreadySearch(true);
      setFullPageLoaded(false);
      setBooksList(booksListFromStorage);
    }
    if (searchInputFromStorage)
      searchInputRef.current.value = searchInputFromStorage;
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      submit();
    }
  };

  const submit = async () => {
    if (searchInputRef.current.value) {
      setFullPageLoaded(true);

      const res = await searchBooks(searchInputRef.current.value);
      setFullPageLoaded(false);
      setAlreadySearch(true);

      if (res?.docs?.length > 0) {
        setBooksList(res.docs);
        saveOnLocalStorage("books_list", res.docs);
        saveOnLocalStorage("search_input", searchInputRef.current.value);
      } else {
        setBooksList([]);
      }
    }
  };

  const resultsNotFound =
    booksList.length === 0 &&
    searchInputRef.current?.value &&
    !showFullPageLoader;

  return (
    <section>
      {showFullPageLoader && <FullPageLoader />}

      <div className={classes.container}>
        <div className={classes.input_wrap}>
          <input
            className={classes.search_input}
            data-hook="search-input"
            type="text"
            placeholder="Search..."
            ref={searchInputRef}
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon
            className={classes.icon}
            icon={faSearch}
            onClick={(e) => {
              submit();
            }}
          />
        </div>

        {resultsNotFound ? (
          <ResultsNotFound />
        ) : (
          alreadySearch && (
            <div data-hook="all-books" className={classes.all_books}>
              <BooksList list={booksList}></BooksList>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default SearchPage;
