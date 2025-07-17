import React from 'react';

const Message = ({ type = 'info', children }) => {
  const baseStyle = 'p-4 rounded-md shadow-sm text-sm border font-medium';

  const typeStyles = {
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type] || typeStyles.info}`}>
      {children}
    </div>
  );
};

export default Message;
