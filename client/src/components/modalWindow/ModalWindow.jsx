import React, { useState } from "react";
import {FiX} from 'react-icons/fi';

const ModalWindow = ({isOpen, onClose, children}) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    }; 

    return (
        <>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <button className="close-button" onClick={closeModal}>
                  <FiX />
                </button>
                {children}
              </div>
            </div>
          )}
        </>
      );
    };

export default ModalWindow;