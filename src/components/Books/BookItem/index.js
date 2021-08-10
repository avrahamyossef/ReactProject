import { Fragment, useState } from "react";
import * as classes from "./bookItem.module.scss";
import { getBookCoverByOLID } from "../../../booksApi/index";
import ReactImageAppear from "react-image-appear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Modal/index";
import BackDrop from "../../Modal/Backdrop";

const BookItem = ({ book, dataHook }) => {
  const [showCollectionBtn, setShowCollectionBtn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  return (
    <Fragment>
      <div
        className={classes.book_item}
        onMouseEnter={(e) => {
          setShowCollectionBtn(true);
        }}
        onMouseLeave={(e) => {
          setShowCollectionBtn(false);
        }}
      >
        {showCollectionBtn && (
          <div className={classes.add_collection_btn}>
            <FontAwesomeIcon
              className={classes.icon}
              data-hook={`imageIcon-${dataHook}`}
              icon={faPlus}
              onClick={(e) => {
                openModal();
              }}
            />
          </div>
        )}

        <ReactImageAppear
          src={getBookCoverByOLID(book.cover_edition_key)}
          alt={book.title}
          className={classes.img}
          animation="zoomIn"
          animationDuration="1s"
        />
        <p className={classes.book_title}>{book.title}</p>
      </div>

      {modalIsOpen && (
        <Fragment>
          <Modal
            closeModal={closeModalHandler}
            book={book}
            dataHook={dataHook}
          />
          <BackDrop closeModal={closeModalHandler} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default BookItem;
