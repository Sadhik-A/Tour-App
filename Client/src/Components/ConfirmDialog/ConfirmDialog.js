
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ConfirmDialog({ title, subtitle, show, setShow, setDeleteTour }) {
  const handleClose = () => {
    setShow(false);
  };
 const handlechange = () => {
     setShow(false);
       setDeleteTour(true);
 };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{subtitle}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlechange}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDialog;
