import React, { useEffect, useState } from "react";

const MessageToast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!visible || !message) return null;

  return (
    <div className="fixed z-50 px-6 py-3 font-medium text-gray-800 transition-all duration-200 ease-out transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg top-6 left-1/2">
      {message}
    </div>
  );
};

export default MessageToast;
