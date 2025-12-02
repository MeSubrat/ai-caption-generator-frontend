import React, { useEffect } from "react";

const MessagePopup = ({ message = "Success", type = "success", visible = true, onClose }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => onClose(), 2500);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    if (!visible) return null;

    return (
        <div
            style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                padding: "12px 18px",
                borderRadius: "8px",
                color: "#fff",
                backgroundColor:
                    type === "success"
                        ? "#4CAF50"
                        : type === "error"
                            ? "#F44336"
                            : "#2196F3",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                fontSize: "15px",
                zIndex: 9999,
                animation: "fadeIn 0.3s ease-out",
            }}
        >
            {message}
        </div>
    );
};

export default MessagePopup;
