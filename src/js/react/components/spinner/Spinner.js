import React from 'react';

export default function Spinner() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, 0)'
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
