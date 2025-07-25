// src/components/index.js
// Barrel export pro snadný import komponent
// Tento soubor neobsahuje žádnou logiku

export { default as Header } from './Header';
export { default as Controls } from './Controls';
export { default as HistoryPanel } from './HistoryPanel';
export { default as ExplanationSection } from './ExplanationSection';
export { default as SortableItem } from './SortableItem';
export { default as TabNavigation } from './TabNavigation';

// Variants
export { default as WrongVariant } from './variants/WrongVariant';
export { default as GeneratedVariant } from './variants/GeneratedVariant';
export { default as CorrectVariant } from './variants/CorrectVariant';