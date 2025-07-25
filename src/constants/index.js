// src/constants/index.js
// Centralizované konstanty pro celou aplikaci
// Tento soubor neobsahuje business logiku, pouze konfigurační hodnoty

export const VARIANT_TYPES = {
  WRONG: 'wrong',
  GENERATED: 'generated',
  CORRECT: 'correct',
  ALL: 'all'
};

export const INITIAL_ITEMS = ['Položka A', 'Položka B', 'Položka C', 'Položka D'];

export const UI_CONSTANTS = {
  DRAG_ACTIVATION_DISTANCE: 8,
  HISTORY_DISPLAY_LIMIT: 5,
  DRAGGING_OPACITY: 0.5,
  DEFAULT_OPACITY: 1
};

export const ID_GENERATOR_TYPES = {
  INCREMENTAL: 'incremental',
  UUID: 'uuid',
  NANOID: 'nanoid',
  TIMESTAMP: 'timestamp'
};

export const COLORS = {
  PRIMARY_BG: '#1A1A1A',
  SECONDARY_BG: '#121212',
  CARD_BG: '#2C2C2C',
  BORDER: '#333333',
  CRIMSON: '#F7464E',
  IVORY: '#F7F8F3',
  TEAL: '#78BCC4',
  MIDNIGHT: '#002C3E',
  SUCCESS: '#28a745',
  TEXT_PRIMARY: '#F7F8F3',
  TEXT_SECONDARY: '#888888',
  TEXT_MUTED: '#666666'
};

export const MESSAGES = {
  DELETE_ITEM: (value, type) => `Smazána položka "${value}"`,
  MOVE_ITEM: (from, to) => `Přesunuto z pozice ${from} na pozici ${to}`,
  ADD_ITEM: (value) => `Přidána položka "${value}"`
};

export const LABELS = {
  TABS: {
    ALL: 'Všechny varianty',
    WRONG: '❌ Indexy',
    GENERATED: '✅ Vygeneruj ID',
    CORRECT: '✅ S originálním ID'
  },
  BUTTONS: {
    DEBUG_ON: '🐛 Debug zapnutý',
    DEBUG_OFF: '👁 Debug vypnutý',
    RESET: '🔄 Reset',
    DELETE: '✕',
    ADD_ITEM: '➕ Přidat položku'
  },
  TITLES: {
    WRONG: '❌ Špatně: Použití indexů',
    GENERATED: '✅ Řešení: Vygeneruj ID když je nemáš',
    CORRECT: '✅ Správně: Unikátní ID'
  }
};