function Modal(props) {
  return (
    <div className="modal">
      <p>Are You Sure ?</p>
      <button className="btn" onClick={props.onCancel}>
        Cancel
      </button>
      <button className="btn" onClick={props.onConfirm}>
        Confirm
      </button>
    </div>
  );
}

export default Modal;
