import React from 'react';

interface ModalProps {
  title: string;
  content: string;
  profitPerHour: number;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, content, profitPerHour, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-lg rounded-lg bg-white p-6 text-center">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <p className="mb-4">{content}</p>
        <div className="text-xl font-bold">Profit per hour: +{profitPerHour}</div>
        <button className="mt-6 rounded-lg bg-yellow-500 px-6 py-2 text-white" onClick={onClose}>
          Go ahead
        </button>
        <button className="absolute right-4 top-4 text-gray-600" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
