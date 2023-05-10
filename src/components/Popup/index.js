import Modal from "react-modal";

const Popup = (props) => {
  const { showModal, toggleModal } = props;
  const reqToggleModal = () => {
    toggleModal();
  };
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={toggleModal}
      contentLabel="Example Modal"
    >
      <h1>Hello, Modal!</h1>
      <button onClick={reqToggleModal}>Close</button>
    </Modal>
  );
};

export default Popup;
