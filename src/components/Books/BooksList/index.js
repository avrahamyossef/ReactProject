import React, { Fragment } from "react";
//import * as classes from "./booksList.module.scss";
import BookItem from "../BookItem/index";

const BooksList = ({ list = [] }) => {
  return (
    <Fragment>
      {list.length > 0
        ? list.map((item, i) => {
            return (
              <BookItem key={item.key} book={item} dataHook={`book-${i}`} />
            );
          })
        : null}
    </Fragment>
  );
};

export default BooksList;
