// src/components/variants/GeneratedVariant.jsx
// Komponenta demonstrující správné použití vygenerovaných ID
// Tato komponenta obsahuje pouze UI a deleguje logiku na parent komponentu

import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from '../SortableItem';
import { LABELS } from '../../constants';

const GeneratedVariant = ({ items, sensors, onDragEnd, onDelete, onAddItem, showDebug }) => {
  return (
    <div className="example generated-example">
      <h2>{LABELS.TITLES.GENERATED}</h2>
      <div className="code-snippet">
        <pre>{`// Při prvním načtení dat
const dataWithIds = rawData.map(value => ({
  id: generateNanoId(), // nebo UUID, timestamp+random
  value: value
}));

// Při přidání nové položky
const newItem = {
  id: generateNanoId(),
  value: 'Nová položka'
};`}</pre>
      </div>
      
      <div className="solution-explanation">
        <h3>Řešení:</h3>
        <ol>
          <li>Vygeneruj trvalé ID při prvním vytvoření položky</li>
          <li>ID zůstává s položkou bez ohledu na pozici</li>
          <li>Nové položky dostávají nové unikátní ID</li>
          <li>Možnosti: nanoid, UUID, timestamp+random, counter</li>
        </ol>
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext 
          items={items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="sortable-list">
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                value={item.value}
                onDelete={() => onDelete(item.id)}
                isWrong={false}
                showDebugInfo={showDebug}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="instructions">
        <h4>🧪 Vyzkoušej:</h4>
        <ol>
          <li>Smaž libovolnou položku</li>
          <li>Přetahování funguje správně!</li>
          <li>Klikni "Přidat položku" - nová má své vlastní ID</li>
        </ol>
        <button 
          className="add-item-button"
          onClick={onAddItem}
        >
          {LABELS.BUTTONS.ADD_ITEM}
        </button>
      </div>
    </div>
  );
};

export default React.memo(GeneratedVariant);