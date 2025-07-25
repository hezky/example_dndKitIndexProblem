// src/hooks/useHistory.js
// Custom hook pro správu historie akcí
// Tento hook neobsahuje business logiku, pouze state management

import { useState, useCallback } from 'react';
import { UI_CONSTANTS } from '../constants';

export const useHistory = () => {
  const [history, setHistory] = useState([]);

  const addHistoryEntry = useCallback((type, message, isWarning = false) => {
    const entry = {
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
      warning: isWarning
    };

    setHistory(prevHistory => [...prevHistory, entry]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const getRecentHistory = useCallback(() => {
    return history.slice(-UI_CONSTANTS.HISTORY_DISPLAY_LIMIT).reverse();
  }, [history]);

  return {
    history,
    recentHistory: getRecentHistory(),
    addHistoryEntry,
    clearHistory
  };
};