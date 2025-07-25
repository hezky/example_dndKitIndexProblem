// src/hooks/useDragAndDrop.js
// Custom hook pro drag and drop funkcionalitu
// Tento hook neobsahuje business logiku specifickou pro aplikaci

import { useState, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

export const useDragAndDrop = (initialItems, findIndexById) => {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return null;
    }

    const oldIndex = findIndexById ? findIndexById(items, active.id) : active.id;
    const newIndex = findIndexById ? findIndexById(items, over.id) : over.id;

    if (oldIndex === -1 || newIndex === -1) {
      return null;
    }

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    return {
      oldIndex,
      newIndex,
      activeId: active.id,
      overId: over.id
    };
  }, [items, findIndexById]);

  const deleteItem = useCallback((idOrIndex) => {
    if (findIndexById) {
      setItems(prevItems => prevItems.filter(item => item.id !== idOrIndex));
    } else {
      setItems(prevItems => prevItems.filter((_, index) => index !== idOrIndex));
    }
  }, [findIndexById]);

  const addItem = useCallback((item) => {
    setItems(prevItems => [...prevItems, item]);
  }, []);

  const resetItems = useCallback(() => {
    setItems(initialItems);
  }, [initialItems]);

  return {
    items,
    setItems,
    handleDragEnd,
    deleteItem,
    addItem,
    resetItems
  };
};