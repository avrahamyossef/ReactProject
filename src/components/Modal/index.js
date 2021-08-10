import * as classes from "./modal.module.scss";
import React, { useState, useEffect } from "react";
import {
  getFromLocalStorage,
  saveOnLocalStorage,
} from "../../utils/localStorage";
import { isBookExistInCollection, getCollectionById } from "../../utils/index";

const Modal = ({ closeModal, book, dataHook }) => {
  const [collectionList, setCollectionList] = useState([]);

  useEffect(() => {
    const collectionList = getFromLocalStorage("collection_list");
    if (collectionList) setCollectionList(collectionList);
  }, []);

  const handleSelectCollection = (e, book) => {
    const colId = e.target.value ? parseInt(e.target.value) : null;
    const currentCollection = getCollectionById(colId);

    if (colId) {
      if (!isBookExistInCollection(currentCollection, book.key)) {
        const copyWithNewBook = addBookToCollection(currentCollection, book);
        const updateCollection = [{ ...copyWithNewBook }];
        setCollectionList(updateCollection);
        saveOnLocalStorage("collection_list", updateCollection);
        closeModal();
        alert("Book Added Successfully");
      } else {
        closeModal();
        alert(`Book Already In Collection: ${currentCollection.name}`);
      }
    } else {
      closeModal();
      console.log("Doesn't Found Collection");
    }
  };

  const addBookToCollection = (currentCollection, book) => {
    currentCollection.books.push(book);
    return currentCollection;
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modal_content}>
        <div className={classes.modal_header}>
          <span className={classes.close} onClick={closeModal}>
            &times;
          </span>
          <h2>Add Book To Collection</h2>
        </div>
        <div className={classes.modal_body}>
          {collectionList.length > 0 ? (
            <select
              className={classes.select}
              data-hook={`select-${dataHook}`}
              onChange={(e) => {
                handleSelectCollection(e, book);
              }}
            >
              <option>Select...</option>
              {collectionList.map((item, i) => {
                return (
                  <option
                    key={i}
                    value={item.id}
                    data-hook={`option-${i}-${dataHook}`}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          ) : (
            <p>Please First Create Collection {}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
