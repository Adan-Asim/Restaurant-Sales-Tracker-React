import firebaseDb from "./firebaseConfig";
import { ref, push, child, update, remove, get, set } from "firebase/database";

const itemsRef = ref(firebaseDb, "items");

export const createItem = (item) => {
  const newItemRef = push(itemsRef);
  return set(newItemRef, item).then(() => newItemRef.key);
};

export const getAllItems = () => {
  return get(itemsRef).then((snapshot) => snapshot.val());
};

export const getItemById = (itemId) => {
  return get(child(itemsRef, itemId)).then((snapshot) => snapshot.val());
};

export const updateItem = (itemId, updatedItem) => {
  return update(child(itemsRef, itemId), updatedItem);
};

export const deleteItem = (itemId) => {
  return remove(child(itemsRef, itemId));
};
