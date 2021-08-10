import * as classes from "./modal.module.scss";

const BackDrop = ({ closeModal }) => {
  return <div className={classes.back_drop} onClick={closeModal}></div>;
};

export default BackDrop;
