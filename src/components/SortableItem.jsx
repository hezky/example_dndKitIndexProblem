// src/components/SortableItem.jsx
// Komponenta pro jednotlivé přetahovatelné položky
// Tato komponenta neobsahuje business logiku, pouze UI reprezentaci

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UI_CONSTANTS, LABELS } from '../constants';

const SortableItem = ({ id, value, onDelete, isWrong, showDebugInfo }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? UI_CONSTANTS.DRAGGING_OPACITY : UI_CONSTANTS.DEFAULT_OPACITY,
  };

  const getDebugLabel = () => {
    if (typeof id === 'number') {
      return `Index ${id}`;
    }
    return id;
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete();
  };

  const getItemClassName = () => {
    const classes = ['sortable-item'];
    
    if (isDragging) {
      classes.push('dragging');
    }
    
    if (isWrong) {
      classes.push('wrong');
    } else {
      classes.push('correct');
    }
    
    return classes.join(' ');
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={getItemClassName()}
      {...attributes} 
      {...listeners}
    >
      <div className="item-content">
        <span className="item-value">{value}</span>
        {showDebugInfo && (
          <span className="debug-info">
            ID: {getDebugLabel()}
          </span>
        )}
      </div>
      <button 
        className="delete-button" 
        onClick={handleDelete}
        tabIndex={-1}
        aria-label={`Delete ${value}`}
      >
        {LABELS.BUTTONS.DELETE}
      </button>
    </div>
  );
};

export default React.memo(SortableItem);