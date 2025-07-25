// src/components/variants/CorrectVariant.jsx
// Komponenta demonstrující správné použití unikátních ID
// Tato komponenta obsahuje pouze UI a deleguje logiku na parent komponentu

import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from '../SortableItem';
import { LABELS } from '../../constants';

const CorrectVariant = ({ items, sensors, onDragEnd, onDelete, showDebug }) => {
  return (
    <div className="example correct-example">
      <h2>{LABELS.TITLES.CORRECT}</h2>
      <div className="code-snippet">
        <pre>{`items={data.map(item => item.id)}`}</pre>
      </div>
      
      <div className="solution-explanation">
        <h3>Řešení:</h3>
        <ol>
          <li>Každá položka má trvalé unikátní ID</li>
          <li>ID se nemění při mazání nebo přeřazení</li>
          <li>DnD Kit vždy pracuje se správnou položkou</li>
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
        </ol>
      </div>
    </div>
  );
};

export default React.memo(CorrectVariant);