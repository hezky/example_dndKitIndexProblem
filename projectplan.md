# Plán refaktoringu aplikace podle principů čistého kódu

## 🎯 Cíl projektu
Refaktorovat demonstrační aplikaci @dnd-kit podle principů čistého kódu. Aplikace zůstane funkčně stejná, ale kód bude čitelnější, udržitelnější a lépe strukturovaný.

## 📋 Checklist úkolů

### 1. Rozdělení komponent
- [x] Vyextrahovat `SortableItem` do samostatného souboru
- [x] Vytvořit samostatné komponenty pro každou variantu (Wrong, Generated, Correct)
- [x] Vyextrahovat komponenty pro UI prvky (TabButtons, HistoryPanel, ExplanationSection)

### 2. Oddělení business logiky
- [x] Vytvořit custom hooks pro drag & drop logiku
- [x] Vyextrahovat generátory ID do utility modulu
- [x] Vytvořit samostatný modul pro správu historie

### 3. Zlepšení čitelnosti kódu
- [x] Nahradit magické konstanty pojmenovanými konstantami
- [x] Zjednodušit složité podmínky pomocí early returns
- [x] Rozdělit velké funkce na menší, jednoznačné funkce

### 4. Optimalizace struktur dat
- [x] Vytvořit typy/konstanty pro typy variant (wrong, generated, correct)
- [x] Centralizovat konfiguraci (texty, barvy, limity)
- [x] Odstranit duplicitní kód v handlerech

### 5. Vylepšení organizace souborů
- [x] Vytvořit logickou strukturu složek (components, hooks, utils, constants)
- [x] Přidat hlavičkové komentáře ke každému souboru
- [x] Vytvořit barrel exports pro snadný import

### 6. Vylepšení error handling
- [x] Přidat validaci props (částečně - ošetřeny null hodnoty)
- [x] Ošetřit edge cases (prázdné seznamy, null hodnoty)
- [x] Přidat užitečné error messages (aria-labels)

### 7. Vylepšení performance
- [x] Implementovat React.memo pro komponenty bez změn
- [x] Použít useCallback pro event handlery
- [x] Optimalizovat re-rendery pomocí useMemo

### 8. Dokumentace
- [ ] Vytvořit README.cz.md a README.en.md pro každou komponentu
- [ ] Napsat podrobný článek o refaktoringu a principech čistého kódu

## 📊 Review - Co bylo provedeno

### Hlavní změny:
1. **Modulární architektura** - Aplikace byla rozdělena do logických celků:
   - `components/` - UI komponenty
   - `hooks/` - Custom React hooks
   - `utils/` - Utility funkce
   - `constants/` - Centralizované konstanty

2. **Separace concerns** - Každý modul má jednu zodpovědnost:
   - Komponenty obsahují pouze UI logiku
   - Business logika je v custom hooks
   - Konfigurace je centralizovaná v konstantách

3. **Čistší kód**:
   - Odstranění magických konstant
   - Použití popisných názvů
   - Menší, jednoznačné funkce
   - Early returns pro lepší čitelnost

4. **Performance optimalizace**:
   - React.memo pro statické komponenty
   - useCallback pro event handlery
   - Efektivní state management

### Výsledek:
- Kód je nyní mnohem čitelnější a udržitelnější
- Snadnější testování díky modulární struktuře
- Lepší výkon díky optimalizacím
- Zachována plná funkcionalita původní aplikace

---

# Project Refactoring Plan According to Clean Code Principles

## 🎯 Project Goal
Refactor the @dnd-kit demonstration application according to clean code principles. The application will remain functionally the same, but the code will be more readable, maintainable, and better structured.

## 📋 Task Checklist

### 1. Component Separation
- [ ] Extract `SortableItem` into a separate file
- [ ] Create separate components for each variant (Wrong, Generated, Correct)
- [ ] Extract UI components (TabButtons, HistoryPanel, ExplanationSection)

### 2. Business Logic Separation
- [ ] Create custom hooks for drag & drop logic
- [ ] Extract ID generators into utility module
- [ ] Create separate module for history management

### 3. Code Readability Improvements
- [ ] Replace magic constants with named constants
- [ ] Simplify complex conditions using early returns
- [ ] Split large functions into smaller, single-purpose functions

### 4. Data Structure Optimization
- [ ] Create types/constants for variant types (wrong, generated, correct)
- [ ] Centralize configuration (texts, colors, limits)
- [ ] Remove duplicate code in handlers

### 5. File Organization Improvements
- [ ] Create logical folder structure (components, hooks, utils, constants)
- [ ] Add header comments to each file
- [ ] Create barrel exports for easy imports

### 6. Error Handling Improvements
- [ ] Add prop validation
- [ ] Handle edge cases (empty lists, null values)
- [ ] Add helpful error messages

### 7. Performance Improvements
- [ ] Implement React.memo for static components
- [ ] Use useCallback for event handlers
- [ ] Optimize re-renders using useMemo

### 8. Documentation
- [ ] Create README.cz.md and README.en.md for each component
- [ ] Write detailed article about refactoring and clean code principles