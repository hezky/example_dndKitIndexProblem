// src/components/HistoryPanel.jsx
// Komponenta pro zobrazení historie akcí
// Tato komponenta neobsahuje business logiku, pouze UI reprezentaci

import React from 'react';

const HistoryPanel = ({ history }) => {
  if (!history || history.length === 0) {
    return null;
  }

  const getHistoryItemClassName = (entry) => {
    const classes = ['history-item', entry.type];
    
    if (entry.warning) {
      classes.push('warning');
    }
    
    return classes.join(' ');
  };

  return (
    <div className="history-panel">
      <h3>📜 Historie akcí</h3>
      <div className="history-list">
        {history.map((entry, index) => (
          <div 
            key={index} 
            className={getHistoryItemClassName(entry)}
          >
            <span className="history-time">{entry.timestamp}</span>
            <span className="history-message">{entry.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(HistoryPanel);