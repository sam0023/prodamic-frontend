import Modal from "react-modal";
import { MdOutlineCancel } from "react-icons/md";
import "./index.css";

const Popup = (props) => {
  const { showModal, toggleModal } = props;

  const reqToggleModal = () => {
    toggleModal();
  };
  return (
    <div className="modal-bg">
      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        contentLabel="Example Modal"
        style={{
          content: {
            height: "auto",
            borderRadius: "10px",
            width: "auto",
            top: "20%", // Center the modal vertically
            left: "50%", // Center the modal horizontally
            transform: "translate(-50%, -50%)", // Adjust position with transform
            right: "auto",
            bottom: "auto",
            padding: "5px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the transparency here
          },
        }}
      >
        <div>
          <div className="popup">
            <MdOutlineCancel className="popup" onClick={reqToggleModal} />
          </div>
          <div className="popup-text-bg">
            <h2 className="popup-text">Please! Enter a valid username.</h2>
            <div>
              <button
                type="button"
                className="popup-btn"
                onClick={reqToggleModal}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Popup;
