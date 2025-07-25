// src/components/TabNavigation.jsx
// Komponenta pro navigaci mezi variantami
// Tato komponenta neobsahuje business logiku, pouze UI reprezentaci

import React from 'react';
import { VARIANT_TYPES, LABELS } from '../constants';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: VARIANT_TYPES.ALL, label: LABELS.TABS.ALL },
    { id: VARIANT_TYPES.WRONG, label: LABELS.TABS.WRONG },
    { id: VARIANT_TYPES.GENERATED, label: LABELS.TABS.GENERATED },
    { id: VARIANT_TYPES.CORRECT, label: LABELS.TABS.CORRECT }
  ];

  return (
    <div className="tab-buttons">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-pressed={activeTab === tab.id}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default React.memo(TabNavigation);