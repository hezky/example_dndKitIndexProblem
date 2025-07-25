// src/components/Header.jsx
// Komponenta pro hlavičku aplikace
// Tato komponenta neobsahuje business logiku, pouze UI reprezentaci

import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h1>@dnd-kit: Problém s indexy jako ID</h1>
      <p className="subtitle">
        Interaktivní demonstrace proč nepoužívat indexy jako identifikátory
      </p>
    </header>
  );
};

export default React.memo(Header);