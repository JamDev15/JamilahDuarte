import React from 'react';
import './GlassCard.css';

function GlassCard({ title, children }) {
  return (
    <div className="glass-card">
      {title && <h2>{title}</h2>}
      <div className="glass-content">{children}</div>
    </div>
  );
}

export default GlassCard;
