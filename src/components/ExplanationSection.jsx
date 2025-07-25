// src/components/ExplanationSection.jsx
// Komponenta pro zobrazení vysvětlení problému
// Tato komponenta neobsahuje business logiku, pouze statický obsah

import React from 'react';

const ExplanationSection = () => {
  return (
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
            <li><strong>timestamp + random:</strong> {`\${Date.now()}-\${Math.random()}`}</li>
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
  );
};

export default React.memo(ExplanationSection);