import React from "react";
import "./css/modal.css"
interface ModalOpenGameProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalOpenGame = ({ isOpen, onClose }: ModalOpenGameProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal__overlay" onClick={onClose}>
            <div
                className="modal__frame"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal__body-ogame">
                    <p className="ogame__text">COMING SOON…</p>
                </div>
            </div>
        </div >
    );
};

export default ModalOpenGame;
