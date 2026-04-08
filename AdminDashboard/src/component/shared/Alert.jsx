import React from "react";
import { AlertCircle, CheckCircle, InfoIcon, XCircle } from "lucide-react";

const Alert = ({ type = "info", message, onClose, closeable = true }) => {
  const typeClasses = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      icon: CheckCircle,
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: XCircle,
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      icon: AlertCircle,
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: InfoIcon,
    },
  };

  const config = typeClasses[type] || typeClasses.info;
  const Icon = config.icon;

  return (
    <div
      className={`${config.bg} border ${config.border} ${config.text} px-4 py-3 rounded-lg flex items-start gap-3`}
    >
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {closeable && (
        <button
          onClick={onClose}
          className={`text-lg hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
