import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div className="bg-mgh-blue text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 border-t-2 border-mgh-cyan min-w-[300px]">
        <CheckCircle size={18} strokeWidth={2} className="text-mgh-cyan flex-shrink-0" />
        <span className="font-barlow text-sm flex-1">{message}</span>
        <button onClick={onClose} className="text-white/60 hover:text-white">
          <X size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
