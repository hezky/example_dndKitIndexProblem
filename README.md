# DnD Kit - Problém s indexy jako ID

Edukativní aplikace demonstrující častou chybu při použití @dnd-kit knihovny - použití indexů pole jako identifikátorů pro drag & drop položky.

## 🚀 Spuštění

```bash
npm install
npm run dev
```

Aplikace se otevře na http://localhost:5173

## 📚 Co aplikace ukazuje

### ❌ Špatná implementace
- Používá indexy pole jako ID pro položky
- Po smazání položky se rozbije drag & drop funkcionalita
- DnD Kit pracuje s nesprávnými položkami

### ✅ Správná implementace
- Každá položka má unikátní a trvalé ID
- Drag & drop funguje správně i po mazání položek
- ID zůstává s položkou bez ohledu na její pozici

## 🎯 Hlavní features

1. **Interaktivní porovnání** - vidíte obě varianty vedle sebe
2. **Debug mode** - zobrazuje ID položek pro lepší pochopení
3. **Historie akcí** - sleduje všechny operace pro analýzu
4. **Responzivní design** - funguje na všech zařízeních

## 🔧 Technologie

- React 18
- @dnd-kit/core & @dnd-kit/sortable
- Vite
- CSS (vanilla, žádný framework)

## 📖 Klíčové poučení

**Nikdy nepoužívejte index pole jako ID pro drag & drop položky!**

Použijte místo toho:
- ID z databáze
- Vygenerované unikátní ID (UUID, nanoid)
- Jakýkoliv stabilní identifikátor