import React from "react";
import "./css/modal.css"
interface ModalGeneratorProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalGenerator = ({ isOpen, onClose }: ModalGeneratorProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal__overlay" onClick={onClose}>
            <div
                className="modal__frame"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal__body-gener">
                    <p className="gener__text">COMING SOON…</p>
                </div>
            </div>
        </div >
    );
};

export default ModalGenerator;
