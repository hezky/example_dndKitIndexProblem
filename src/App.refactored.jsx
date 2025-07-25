// src/App.refactored.jsx
// Hlavní aplikace - refaktorovaná verze s čistým kódem
// Tato komponenta orchestruje celou aplikaci a deleguje specifickou logiku do modulů

import React, { useState, useCallback, useMemo } from 'react';
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

// Components
import Header from './components/Header';
import Controls from './components/Controls';
import HistoryPanel from './components/HistoryPanel';
import ExplanationSection from './components/ExplanationSection';
import WrongVariant from './components/variants/WrongVariant';
import GeneratedVariant from './components/variants/GeneratedVariant';
import CorrectVariant from './components/variants/CorrectVariant';

// Hooks
import { useHistory } from './hooks/useHistory';
import { useDragAndDrop } from './hooks/useDragAndDrop';

// Utils
import { generateNanoId, addIdsToValues, createItemWithId } from './utils/idGenerators';

// Constants
import { VARIANT_TYPES, INITIAL_ITEMS, UI_CONSTANTS, MESSAGES } from './constants';

import './App.css';

const App = () => {
  // State
  const [showDebug, setShowDebug] = useState(true);
  const [activeTab, setActiveTab] = useState(VARIANT_TYPES.ALL);
  
  // History management
  const { recentHistory, addHistoryEntry, clearHistory } = useHistory();
  
  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: UI_CONSTANTS.DRAG_ACTIVATION_DISTANCE,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Wrong variant (using indexes)
  const wrongVariant = useDragAndDrop(INITIAL_ITEMS);
  
  // Generated variant (with generated IDs)
  const generatedVariant = useDragAndDrop(
    addIdsToValues(INITIAL_ITEMS),
    (items, id) => items.findIndex(item => item.id === id)
  );
  
  // Correct variant (with stable IDs)
  const correctVariant = useDragAndDrop(
    addIdsToValues(INITIAL_ITEMS, 'incremental'),
    (items, id) => items.findIndex(item => item.id === id)
  );

  // Handlers for wrong variant
  const handleWrongDragEnd = useCallback((event) => {
    const result = wrongVariant.handleDragEnd(event);
    if (result) {
      addHistoryEntry(
        VARIANT_TYPES.WRONG,
        MESSAGES.MOVE_ITEM(result.oldIndex, result.newIndex)
      );
    }
  }, [wrongVariant, addHistoryEntry]);

  const handleWrongDelete = useCallback((index) => {
    const deletedItem = wrongVariant.items[index];
    wrongVariant.deleteItem(index);
    addHistoryEntry(
      VARIANT_TYPES.WRONG,
      MESSAGES.DELETE_ITEM(deletedItem, 'index'),
      true
    );
  }, [wrongVariant, addHistoryEntry]);

  // Handlers for generated variant
  const handleGeneratedDragEnd = useCallback((event) => {
    const result = generatedVariant.handleDragEnd(event);
    if (result) {
      addHistoryEntry(
        VARIANT_TYPES.GENERATED,
        `Přesunuto položku s ID ${result.activeId} na pozici ${result.newIndex}`
      );
    }
  }, [generatedVariant, addHistoryEntry]);

  const handleGeneratedDelete = useCallback((id) => {
    const deletedItem = generatedVariant.items.find(item => item.id === id);
    if (deletedItem) {
      generatedVariant.deleteItem(id);
      addHistoryEntry(
        VARIANT_TYPES.GENERATED,
        MESSAGES.DELETE_ITEM(deletedItem.value, 'ID')
      );
    }
  }, [generatedVariant, addHistoryEntry]);

  const handleAddGeneratedItem = useCallback(() => {
    const newValue = `Nová položka ${generatedVariant.items.length + 1}`;
    const newItem = createItemWithId(newValue);
    generatedVariant.addItem(newItem);
    addHistoryEntry(
      VARIANT_TYPES.GENERATED,
      MESSAGES.ADD_ITEM(newValue)
    );
  }, [generatedVariant, addHistoryEntry]);

  // Handlers for correct variant
  const handleCorrectDragEnd = useCallback((event) => {
    const result = correctVariant.handleDragEnd(event);
    if (result) {
      addHistoryEntry(
        VARIANT_TYPES.CORRECT,
        `Přesunuto položku s ID ${result.activeId} na pozici ${result.newIndex}`
      );
    }
  }, [correctVariant, addHistoryEntry]);

  const handleCorrectDelete = useCallback((id) => {
    const deletedItem = correctVariant.items.find(item => item.id === id);
    if (deletedItem) {
      correctVariant.deleteItem(id);
      addHistoryEntry(
        VARIANT_TYPES.CORRECT,
        MESSAGES.DELETE_ITEM(deletedItem.value, 'ID')
      );
    }
  }, [correctVariant, addHistoryEntry]);

  // Reset functionality
  const handleReset = useCallback(() => {
    wrongVariant.resetItems();
    generatedVariant.setItems(addIdsToValues(INITIAL_ITEMS));
    correctVariant.setItems(addIdsToValues(INITIAL_ITEMS, 'incremental'));
    clearHistory();
  }, [wrongVariant, generatedVariant, correctVariant, clearHistory]);

  // Toggle debug
  const handleDebugToggle = useCallback(() => {
    setShowDebug(prev => !prev);
  }, []);

  // Determine which variants to show
  const shouldShowVariant = useCallback((variantType) => {
    return activeTab === VARIANT_TYPES.ALL || activeTab === variantType;
  }, [activeTab]);

  return (
    <div className="app">
      <Header />
      
      <Controls
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showDebug={showDebug}
        onDebugToggle={handleDebugToggle}
        onReset={handleReset}
      />

      <div className="main-content">
        <div className={`examples ${activeTab}`}>
          {shouldShowVariant(VARIANT_TYPES.WRONG) && (
            <WrongVariant
              items={wrongVariant.items}
              sensors={sensors}
              onDragEnd={handleWrongDragEnd}
              onDelete={handleWrongDelete}
              showDebug={showDebug}
            />
          )}

          {shouldShowVariant(VARIANT_TYPES.GENERATED) && (
            <GeneratedVariant
              items={generatedVariant.items}
              sensors={sensors}
              onDragEnd={handleGeneratedDragEnd}
              onDelete={handleGeneratedDelete}
              onAddItem={handleAddGeneratedItem}
              showDebug={showDebug}
            />
          )}

          {shouldShowVariant(VARIANT_TYPES.CORRECT) && (
            <CorrectVariant
              items={correctVariant.items}
              sensors={sensors}
              onDragEnd={handleCorrectDragEnd}
              onDelete={handleCorrectDelete}
              showDebug={showDebug}
            />
          )}
        </div>

        <HistoryPanel history={recentHistory} />
      </div>

      <ExplanationSection />
    </div>
  );
};

export default App;