

import Modal from "react-bootstrap/Modal";
import './ConfirmDialog.scss'
function ConfirmDialog({ title, subtitle, show, setShow, setDeleteTour }) {
  const handleClose = () => {
    setShow(false);
  };
 const handlechange = () => {
     setShow(false);
   setDeleteTour(true);
   
 };
  return (
    <Modal  show={show} onHide={handleClose} className="main-modal">
      <div className="deletemodal">
        <div className="delete-options">
          <div className="dialog-title">{title}</div>
          <div className="dialog-subtitle">{subtitle}</div>
        </div>
        <div className="Dialog-icons">
          <div className="Delete-icon" onClick={handlechange}>
            Delete
          </div>
          <div className="Cancel-icon" onClick={handleClose}>
            Cancel
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
