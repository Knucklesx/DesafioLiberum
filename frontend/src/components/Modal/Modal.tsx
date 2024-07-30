import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../Button/Button";

interface ModalNewProps {
  UpperText: string;
  LowerText: string;
  onClose: () => void;
  isOpen: boolean;
  handleDeleteConfirm: () => void;
  setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void;
  [key: string]: any;
}

function ModalNew({
  UpperText,
  LowerText,
  onClose,
  isOpen,
  handleDeleteConfirm,
  setIsDeleteModalOpen,
  ...props
}: ModalNewProps) {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{UpperText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{LowerText}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            variant="outlined"
            styleSheet={{ marginRight: "10px" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            styleSheet={{ backgroundColor: "red", color: "white" }}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalNew;
