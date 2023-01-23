import { v4 as uuidv4 } from 'uuid';

// Проверка валидности содержимого для контента в todo
export const todoContentIsValid = (content: string) => !!content.trim();

// Генерация ID
export const generateId = () => uuidv4();

export const patchObjectInArray = (
  array: Array<any>,
  searchCallback: (el: any) => boolean,
  patcher: (el: any) => Object,
) => array.map(el => (searchCallback(el) ? { ...el, ...patcher(el) } : el));
