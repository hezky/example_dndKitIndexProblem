# Principy čistého kódu - Souhrn požadavků

## 1. Čitelnost a srozumitelnost
- **Jasná jména**: Proměnné, funkce a třídy musí mít popisná jména
- **Samodokumentující kód**: Kód by měl být pochopitelný bez komentářů
- **Konzistentní formátování**: Jednotný styl napříč celým projektem

## 2. Jednoduchost (KISS - Keep It Simple, Stupid)
- **Malé funkce**: Každá funkce dělá jednu věc dobře
- **Omezená složitost**: Maximálně 3-4 úrovně zanořování
- **Early returns**: Redukce zanořování pomocí brzké návratové hodnoty

## 3. DRY (Don't Repeat Yourself)
- **Žádné duplicity**: Stejný kód nikdy dvakrát
- **Znovupoužitelné komponenty**: Modulární přístup
- **Centralizovaná logika**: Společná funkčnost na jednom místě

## 4. SOLID principy
- **Single Responsibility**: Každá třída/funkce má jednu zodpovědnost
- **Open/Closed**: Otevřeno pro rozšíření, uzavřeno pro modifikaci
- **Liskov Substitution**: Podtypy musí být zaměnitelné
- **Interface Segregation**: Malé, specifické rozhraní
- **Dependency Inversion**: Závislost na abstrakcích, ne konkrétních implementacích

## 5. Testovatelnost
- **Pure funkce**: Bez vedlejších efektů
- **Dependency injection**: Snadné mockování závislostí
- **Oddělení logiky od UI**: Business logika oddělená od prezentace

## 6. Organizace kódu
- **Logická struktura složek**: Snadná navigace
- **Konzistentní pojmenování souborů**: Předvídatelné umístění
- **Modulární architektura**: Oddělené koncerny

## 7. Komentáře
- **Proč, ne co**: Komentáře vysvětlují záměr
- **Aktuální komentáře**: Žádné zastaralé informace
- **Minimální komentáře**: Kód mluví sám za sebe

## 8. Error handling
- **Explicitní zpracování chyb**: Žádné tiché selhání
- **Srozumitelné chybové zprávy**: Uživatel ví, co se stalo
- **Graceful degradation**: Aplikace pokračuje i při chybě

## 9. Performance
- **Optimalizace až když je potřeba**: Nejdříve správnost
- **Měření před optimalizací**: Data-driven rozhodnutí
- **Čitelnost > mikro-optimalizace**: Udržitelnost je důležitější

## 10. Bezpečnost
- **Žádné hardcoded secrets**: Použití environment proměnných
- **Validace vstupů**: Nikdy nedůvěřovat uživatelským datům
- **Princip nejmenších oprávnění**: Minimální nutná práva