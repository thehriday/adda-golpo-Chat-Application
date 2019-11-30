import React, { useEffect } from 'react';

export default function CenterElement(props) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#555'
      }}
    >
      {props.children}
    </div>
  );
}
