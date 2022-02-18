// from libraries
import { ModalBody, ModalHeader, Modal } from "reactstrap";

const FormModal = ({ setIsModalOpen, isModalOpen, button, component }) => {
  return (
    <>
      {button}
      <Modal
        isOpen={isModalOpen}
        size="xl"
        toggle={() => setIsModalOpen(!isModalOpen)}
      >
        <ModalHeader
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(!isModalOpen)}
        >
          User Detail
        </ModalHeader>
        <ModalBody>{component}</ModalBody>
      </Modal>
    </>
  );
};

export default FormModal;
