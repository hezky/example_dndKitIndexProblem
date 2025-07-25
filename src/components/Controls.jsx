// src/components/Controls.jsx
// Komponenta pro ovládací prvky aplikace
// Tato komponenta neobsahuje business logiku, pouze UI reprezentaci

import React from 'react';
import TabNavigation from './TabNavigation';
import { LABELS } from '../constants';

const Controls = ({ activeTab, onTabChange, showDebug, onDebugToggle, onReset }) => {
  return (
    <div className="controls">
      <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />
      
      <div className="action-buttons">
        <button 
          className="debug-toggle"
          onClick={onDebugToggle}
          aria-pressed={showDebug}
        >
          {showDebug ? LABELS.BUTTONS.DEBUG_ON : LABELS.BUTTONS.DEBUG_OFF}
        </button>
        <button 
          className="reset-button"
          onClick={onReset}
        >
          {LABELS.BUTTONS.RESET}
        </button>
      </div>
    </div>
  );
};

export default React.memo(Controls);