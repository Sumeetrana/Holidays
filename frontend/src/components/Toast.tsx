import React, { useEffect } from "react";

interface IProps {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
}

const Toast: React.FC<IProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed bottom-4 left-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed bottom-4 left-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div className={styles} data-testId={`Toast__${type}`}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
