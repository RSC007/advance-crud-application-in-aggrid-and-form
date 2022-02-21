// from libraries
import { ModalBody, ModalHeader, Modal } from "reactstrap";

const FormModal = ({
  setIsModalOpen,
  isModalOpen,
  button = null,
  component,
  size = "xl",
  title = "",
}) => {
  return (
    <>
      {button}
      <Modal
        isOpen={isModalOpen}
        size={size}
        toggle={() => setIsModalOpen(!isModalOpen)}
      >
        <ModalHeader
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(!isModalOpen)}
        >
          {title}
        </ModalHeader>
        <ModalBody>{component}</ModalBody>
      </Modal>
    </>
  );
};

export default FormModal;
