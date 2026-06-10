import { addDoc, collection, } from "firebase/firestore";

import { db } from "./config";
import { Session } from "@/types/firestore";

export async function createSession(session: Session) {
    const docRef = await addDoc(
        collection(db, 'sessions'),
        session
    );

    return docRef.id;
}