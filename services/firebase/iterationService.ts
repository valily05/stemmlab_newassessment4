import { addDoc, collection, } from "firebase/firestore";

import { db } from "./config";
import { Iteration } from "@/types/firestore";

export async function saveIteration(sessionID: string, iteration: Iteration) {
    const iterationRef = collection(
        db,
        'sessions',
        sessionID,
        'iterations'
    );

    const docRef = await addDoc(
        iterationRef,
        iteration
    );

    return docRef.id;
}