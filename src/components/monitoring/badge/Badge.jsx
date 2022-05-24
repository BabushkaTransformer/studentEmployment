import React from 'react';
import './style.css';

export const Badge = props => {
  return (
    <span className={`badge badge-${props.type}`}>
      {props.content}
    </span>
  );
};
