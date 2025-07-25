// src/utils/idGenerators.js
// Utility funkce pro generování unikátních ID
// Tento soubor neobsahuje žádnou business logiku, pouze pure funkce pro generování ID

let idCounter = 0;

/**
 * Generuje inkrementální ID
 * @returns {string} ID ve formátu 'item-{number}'
 */
export const generateIncrementalId = () => {
  return `item-${++idCounter}`;
};

/**
 * Generuje UUID (s fallbackem pro starší prohlížeče)
 * @returns {string} UUID string
 */
export const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback pro starší prohlížeče
  return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Generuje krátké ID podobné nanoid
 * @param {number} size - Délka ID (výchozí 8)
 * @returns {string} Náhodné ID
 */
export const generateNanoId = (size = 8) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < size; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  
  return result;
};

/**
 * Generuje ID založené na timestamp a náhodném čísle
 * @returns {string} ID ve formátu '{timestamp}-{random}'
 */
export const generateTimestampId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${timestamp}-${random}`;
};

/**
 * Vytvoří položku s vygenerovaným ID
 * @param {string} value - Hodnota položky
 * @param {string} idType - Typ generátoru ID (výchozí 'nanoid')
 * @returns {Object} Objekt s id a value
 */
export const createItemWithId = (value, idType = 'nanoid') => {
  const generators = {
    incremental: generateIncrementalId,
    uuid: generateUUID,
    nanoid: generateNanoId,
    timestamp: generateTimestampId
  };
  
  const generator = generators[idType] || generators.nanoid;
  
  return {
    id: generator(),
    value
  };
};

/**
 * Transformuje pole hodnot na pole objektů s ID
 * @param {Array<string>} values - Pole hodnot
 * @param {string} idType - Typ generátoru ID
 * @returns {Array<Object>} Pole objektů s id a value
 */
export const addIdsToValues = (values, idType = 'nanoid') => {
  return values.map(value => createItemWithId(value, idType));
};