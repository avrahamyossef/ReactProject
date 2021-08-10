import * as classes from "./collection.module.scss";
import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { getBookCoverByOLID } from "../../booksApi/index";
import ReactImageAppear from "react-image-appear";
import {
  saveOnLocalStorage,
  getFromLocalStorage,
} from "../../utils/localStorage";
import { getCollectionById } from "../../utils/index";

const CollectionPage = () => {
  const [collectionList, setCollectionList] = useState([]);
  const [collectionNameInput, setCollectionNameInput] = useState("");

  useEffect(() => {
    const collection = getFromLocalStorage("collection_list");
    if (collection && collection.length > 0) {
      setCollectionList(collection);
    }
  }, []);

  const handleChange = (e) => {
    setCollectionNameInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (collectionNameInput) {
      addNewCollection(collectionNameInput);
      setCollectionNameInput("");
      alert("Collection Added Successfully");
    }
  };

  const addNewCollection = (userInput) => {
    let copyList = [...collectionList];
    copyList = [
      ...copyList,
      { id: collectionList.length + 1, name: userInput, books: [] },
    ];
    setCollectionList(copyList);
    saveOnLocalStorage("collection_list", copyList);
  };

  const deleteCollection = (collId) => {
    if (collId) {
      const updateList = collectionList.filter((item) => item.id !== collId);
      setCollectionList(updateList);
      saveOnLocalStorage("collection_list", updateList);
      alert("Book Added Successfully");
    }
  };

  const deleteBookFromCollection = (collId, bookKey) => {
    const collection = getCollectionById(collId);

    if (collection) {
      const books = collection.books.filter((book) => book.key !== bookKey);
      const updateCollection = [{ ...collection, books: books }];
      const newCollection = collectionList.map(
        (originList) =>
          updateCollection.find((o) => o.id === originList.id) || originList
      );
      setCollectionList(newCollection);
      saveOnLocalStorage("collection_list", newCollection);
    }
  };

  return (
    <section>
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <div className={classes.input_warp}>
            <input
              type="text"
              data-hook="add-collection-input"
              placeholder="Collection Name"
              value={collectionNameInput}
              onChange={handleChange}
              className={classes.input}
            />
            <button className={classes.btn} type="submit">
              <FontAwesomeIcon
                className={classes.icon}
                data-hook="add-collection-icon"
                icon={faPlus}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              />
            </button>
          </div>
        </form>
        {collectionList.length > 0 ? (
          <div className={classes.collection_list}>
            {collectionList.map((collection, index) => {
              return (
                <div className={classes.collection_item} key={index}>
                  <hr />
                  <div
                    className={classes.name_icon_warp}
                    data-id={collection.id}
                  >
                    <h2>{collection.name}</h2>
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faTrashAlt}
                      onClick={() => {
                        deleteCollection(collection.id);
                      }}
                    />
                  </div>
                  <div className={classes.books_container}>
                    <Fragment>
                      {collection.books.length > 0 ? (
                        collection.books.map((book, index) => {
                          return (
                            <div
                              key={book.key}
                              data-id={book.key}
                              className={classes.book_item}
                            >
                              <div data-hook={`image-${index}`}>
                                <ReactImageAppear
                                  src={getBookCoverByOLID(
                                    book.cover_edition_key
                                  )}
                                  alt={book.title}
                                  className={classes.img}
                                  animation="zoomIn"
                                  animationDuration="1s"
                                />
                              </div>
                              <p className={classes.book_title}>{book.title}</p>
                              <FontAwesomeIcon
                                className={classes.trash_icon}
                                icon={faTrashAlt}
                                onClick={() => {
                                  deleteBookFromCollection(
                                    collection.id,
                                    book.key
                                  );
                                }}
                              />
                            </div>
                          );
                        })
                      ) : (
                        <p>No Books Yet On This Collection...</p>
                      )}
                    </Fragment>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No Collection Yet</p>
        )}
      </div>
    </section>
  );
};

export default CollectionPage;
