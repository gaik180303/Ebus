import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

export async function logAction(action, userId) {
  await addDoc(collection(db, "logs"), {
    action: action,
    userId: userId,
    timestamp: serverTimestamp()
  });
}