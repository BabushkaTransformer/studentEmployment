import React from 'react';
import './style.css';

export const StatusCard = ({ icon, title, count }) => {
  return (
    <div className="status-card">
      <div className="status-card__icon">
        {icon}
      </div>
      <div className="status-card__info">
        <h4>{count}</h4>
        <span>{title}</span>
      </div>
    </div>
  );
};
