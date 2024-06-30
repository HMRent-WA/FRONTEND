import React from 'react';
import LoadingSpinner from './loading-spinner';

const LoadingPage = () => {
  return (
    <div className="h-screen fixed left-1/2 -translate-x-1/2 top-1/2 translate-y">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingPage;
