// src/App.jsx
// Hlavní aplikace demonstrující problém s použitím indexů jako ID v @dnd-kit
// Tato aplikace neukazuje chybu, ale edukativně vysvětluje špatnou a správnou implementaci

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './App.css';

// Komponenta pro jednotlivé položky v seznamu
function SortableItem({ id, value, onDelete, isWrong, debugInfo }) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`sortable-item ${isDragging ? 'dragging' : ''} ${isWrong ? 'wrong' : 'correct'}`}
      {...attributes} 
      {...listeners}
    >
      <div className="item-content">
        <span className="item-value">{value}</span>
        {debugInfo && (
          <span className="debug-info">
            ID: {typeof id === 'number' ? `Index ${id}` : id}
          </span>
        )}
      </div>
      <button 
        className="delete-button" 
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        tabIndex={-1}
      >
        ✕
      </button>
    </div>
  );
}

// Různé způsoby generování unikátních ID
let idCounter = 0;
const generateId = () => `item-${++idCounter}`;

// Simulace crypto.randomUUID() (není všude podporováno)
const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback pro starší prohlížeče
  return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Jednoduchý nanoid-like generátor
const generateNanoId = (size = 8) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < size; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
};

// Timestamp + random pro zajištění unikátnosti
const generateTimestampId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default function App() {
  // Data pro špatnou variantu (pouze hodnoty)
  const [wrongItems, setWrongItems] = useState(['Položka A', 'Položka B', 'Položka C', 'Položka D']);
  
  // Data pro variantu s generovanými ID (bez původních ID)
  const [generatedItems, setGeneratedItems] = useState(() => {
    // Simulujeme situaci kdy máme jen hodnoty bez ID
    const rawData = ['Položka A', 'Položka B', 'Položka C', 'Položka D'];
    // Přidáme jim unikátní ID při prvním načtení
    return rawData.map(value => ({
      id: generateNanoId(), // Použijeme nanoid-like generátor
      value: value
    }));
  });
  
  // Data pro správnou variantu (objekty s ID)
  const [correctItems, setCorrectItems] = useState([
    { id: generateId(), value: 'Položka A' },
    { id: generateId(), value: 'Položka B' },
    { id: generateId(), value: 'Položka C' },
    { id: generateId(), value: 'Položka D' }
  ]);

  const [showDebug, setShowDebug] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [dragHistory, setDragHistory] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handler pro špatnou variantu
  const handleWrongDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = active.id; // Toto je index!
      const newIndex = over.id;   // Toto je také index!
      
      setWrongItems((items) => {
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Zaznamenat historii pro debug
        setDragHistory(prev => [...prev, {
          type: 'wrong',
          message: `Přesunuto z indexu ${oldIndex} na index ${newIndex}`,
          timestamp: new Date().toLocaleTimeString()
        }]);
        
        return newItems;
      });
    }
  };

  // Handler pro variantu s generovanými ID
  const handleGeneratedDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setGeneratedItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Zaznamenat historii pro debug
        setDragHistory(prev => [...prev, {
          type: 'generated',
          message: `Přesunuto položku s ID ${active.id} na pozici ${newIndex}`,
          timestamp: new Date().toLocaleTimeString()
        }]);
        
        return newItems;
      });
    }
  };

  // Handler pro správnou variantu
  const handleCorrectDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setCorrectItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Zaznamenat historii pro debug
        setDragHistory(prev => [...prev, {
          type: 'correct',
          message: `Přesunuto položku s ID ${active.id} na pozici ${newIndex}`,
          timestamp: new Date().toLocaleTimeString()
        }]);
        
        return newItems;
      });
    }
  };

  // Handler pro mazání - špatná varianta
  const handleWrongDelete = (index) => {
    setWrongItems((items) => {
      const deletedItem = items[index];
      setDragHistory(prev => [...prev, {
        type: 'wrong',
        message: `Smazána položka "${deletedItem}" na indexu ${index}`,
        timestamp: new Date().toLocaleTimeString(),
        warning: true
      }]);
      return items.filter((_, i) => i !== index);
    });
  };

  // Handler pro mazání - varianta s generovanými ID
  const handleGeneratedDelete = (id) => {
    setGeneratedItems((items) => {
      const deletedItem = items.find(item => item.id === id);
      setDragHistory(prev => [...prev, {
        type: 'generated',
        message: `Smazána položka "${deletedItem.value}" s ID ${id}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
      return items.filter((item) => item.id !== id);
    });
  };

  // Funkce pro přidání nové položky s vygenerovaným ID
  const addGeneratedItem = () => {
    const newValue = `Nová položka ${generatedItems.length + 1}`;
    const newItem = {
      id: generateNanoId(),
      value: newValue
    };
    setGeneratedItems(prev => [...prev, newItem]);
    setDragHistory(prev => [...prev, {
      type: 'generated',
      message: `Přidána položka "${newValue}" s ID ${newItem.id}`,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  // Handler pro mazání - správná varianta
  const handleCorrectDelete = (id) => {
    setCorrectItems((items) => {
      const deletedItem = items.find(item => item.id === id);
      setDragHistory(prev => [...prev, {
        type: 'correct',
        message: `Smazána položka "${deletedItem.value}" s ID ${id}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
      return items.filter((item) => item.id !== id);
    });
  };

  // Reset funkcionalita
  const resetAll = () => {
    setWrongItems(['Položka A', 'Položka B', 'Položka C', 'Položka D']);
    // Reset generované varianty s novými ID
    const rawData = ['Položka A', 'Položka B', 'Položka C', 'Položka D'];
    setGeneratedItems(rawData.map(value => ({
      id: generateNanoId(),
      value: value
    })));
    setCorrectItems([
      { id: generateId(), value: 'Položka A' },
      { id: generateId(), value: 'Položka B' },
      { id: generateId(), value: 'Položka C' },
      { id: generateId(), value: 'Položka D' }
    ]);
    setDragHistory([]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>@dnd-kit: Problém s indexy jako ID</h1>
        <p className="subtitle">Interaktivní demonstrace proč nepoužívat indexy jako identifikátory</p>
      </header>

      <div className="controls">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Všechny varianty
          </button>
          <button 
            className={`tab-button ${activeTab === 'wrong' ? 'active' : ''}`}
            onClick={() => setActiveTab('wrong')}
          >
            ❌ Indexy
          </button>
          <button 
            className={`tab-button ${activeTab === 'generated' ? 'active' : ''}`}
            onClick={() => setActiveTab('generated')}
          >
            ✅ Vygeneruj ID
          </button>
          <button 
            className={`tab-button ${activeTab === 'correct' ? 'active' : ''}`}
            onClick={() => setActiveTab('correct')}
          >
            ✅ S originálním ID
          </button>
        </div>
        
        <div className="action-buttons">
          <button 
            className="debug-toggle"
            onClick={() => setShowDebug(!showDebug)}
          >
            {showDebug ? '🐛 Debug zapnutý' : '👁 Debug vypnutý'}
          </button>
          <button 
            className="reset-button"
            onClick={resetAll}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className={`examples ${activeTab}`}>
          {(activeTab === 'all' || activeTab === 'wrong') && (
            <div className="example wrong-example">
              <h2>❌ Špatně: Použití indexů</h2>
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
                onDragEnd={handleWrongDragEnd}
              >
                <SortableContext 
                  items={wrongItems.map((_, index) => index)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="sortable-list">
                    {wrongItems.map((value, index) => (
                      <SortableItem
                        key={index}
                        id={index}
                        value={value}
                        onDelete={() => handleWrongDelete(index)}
                        isWrong={true}
                        debugInfo={showDebug}
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
          )}

          {(activeTab === 'all' || activeTab === 'generated') && (
            <div className="example generated-example">
              <h2>✅ Řešení: Vygeneruj ID když je nemáš</h2>
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
                onDragEnd={handleGeneratedDragEnd}
              >
                <SortableContext 
                  items={generatedItems.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="sortable-list">
                    {generatedItems.map((item) => (
                      <SortableItem
                        key={item.id}
                        id={item.id}
                        value={item.value}
                        onDelete={() => handleGeneratedDelete(item.id)}
                        isWrong={false}
                        debugInfo={showDebug}
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
                  onClick={addGeneratedItem}
                >
                  ➕ Přidat položku
                </button>
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'correct') && (
            <div className="example correct-example">
              <h2>✅ Správně: Unikátní ID</h2>
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
                onDragEnd={handleCorrectDragEnd}
              >
                <SortableContext 
                  items={correctItems.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="sortable-list">
                    {correctItems.map((item) => (
                      <SortableItem
                        key={item.id}
                        id={item.id}
                        value={item.value}
                        onDelete={() => handleCorrectDelete(item.id)}
                        isWrong={false}
                        debugInfo={showDebug}
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
          )}
        </div>

        {dragHistory.length > 0 && (
          <div className="history-panel">
            <h3>📜 Historie akcí</h3>
            <div className="history-list">
              {dragHistory.slice(-5).reverse().map((entry, index) => (
                <div 
                  key={index} 
                  className={`history-item ${entry.type} ${entry.warning ? 'warning' : ''}`}
                >
                  <span className="history-time">{entry.timestamp}</span>
                  <span className="history-message">{entry.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="explanation">
        <h2>📚 Vysvětlení problému</h2>
        <div className="explanation-content">
          <div className="explanation-section">
            <h3>Proč se to děje?</h3>
            <p>
              Když použiješ index jako ID, vytváříš nestabilní identifikátor. 
              Po smazání položky se indexy všech následujících položek posunou o jedna dolů.
              DnD Kit si ale pamatuje původní ID (indexy) a při další manipulaci pracuje s nesprávnými položkami.
            </p>
          </div>
          
          <div className="explanation-section">
            <h3>Jak to funguje správně?</h3>
            <p>
              Unikátní ID zůstává s položkou napořád, bez ohledu na její pozici v seznamu.
              To zajišťuje, že DnD Kit vždy ví, s kterou položkou pracuje.
            </p>
          </div>

          <div className="explanation-section">
            <h3>Jak vygenerovat ID když je nemáš?</h3>
            <ul>
              <li><strong>nanoid:</strong> Krátké, URL-safe, rychlé (doporučeno)</li>
              <li><strong>crypto.randomUUID():</strong> Standardní UUID v moderních prohlížečích</li>
              <li><strong>timestamp + random:</strong> `${Date.now()}-${Math.random()}`</li>
              <li><strong>Simple counter:</strong> Pro jednoduchou aplikaci</li>
            </ul>
          </div>
          
          <div className="explanation-section">
            <h3>Best practices:</h3>
            <ul>
              <li>Použij ID z databáze (pokud data přicházejí z backendu)</li>
              <li>Vygeneruj ID při prvním vytvoření položky, ne při každém renderu</li>
              <li>Nikdy nepoužívej index, Math.random() nebo jiné nestabilní hodnoty</li>
              <li>Zachovej ID i při ukládání do localStorage/sessionStorage</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}