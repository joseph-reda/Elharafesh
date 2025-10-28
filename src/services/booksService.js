// src/services/booksService.js
import { ref, get, child } from "firebase/database";
import { db } from "../firebase.js"; // ✅ أضف الامتداد الصحيح

export async function fetchBooks() {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "books"));
    if (snapshot.exists()) {
        return Object.entries(snapshot.val()).map(([id, book]) => ({
            id,
            ...book,
        }));
    } else {
        return [];
    }
}
