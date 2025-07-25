// src/components/variants/WrongVariant.jsx
// Komponenta demonstrující špatné použití indexů jako ID
// Tato komponenta obsahuje pouze UI a deleguje logiku na parent komponentu

import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from '../SortableItem';
import { LABELS } from '../../constants';

const WrongVariant = ({ items, sensors, onDragEnd, onDelete, showDebug }) => {
  return (
    <div className="example wrong-example">
      <h2>{LABELS.TITLES.WRONG}</h2>
      <div className="code-snippet">
        <pre>{`items={data.map((_, index) => index)}`}</pre>
      </div>
      
      <div className="problem-explanation">
        <h3>Problém:</h3>
        <ol>
          <li>Při smazání položky se změní indexy všech následujících položek</li>
          <li>DnD Kit si pamatuje staré ID (indexy), které už neodpovídají</li>
          <li>Drag & drop pak pracuje s nesprávnými položkami</li>
        </ol>
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext 
          items={items.map((_, index) => index)}
          strategy={verticalListSortingStrategy}
        >
          <div className="sortable-list">
            {items.map((value, index) => (
              <SortableItem
                key={index}
                id={index}
                value={value}
                onDelete={() => onDelete(index)}
                isWrong={true}
                showDebugInfo={showDebug}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="instructions">
        <h4>🧪 Vyzkoušej:</h4>
        <ol>
          <li>Smaž "Položka B"</li>
          <li>Pokus se přetáhnout "Položka C" - uvidíš, že se chová divně</li>
        </ol>
      </div>
    </div>
  );
};

export default React.memo(WrongVariant);