import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative flex h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-blue-100"></div>
      </div>
      <p className="mt-4 text-sm text-gray-600 tracking-wide">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader;
