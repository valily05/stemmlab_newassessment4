import { addDoc, collection, } from "firebase/firestore";

import { Iteration } from "@/types/firestore";
import { db } from "./config";
export async function saveIteration(
    sessionID: string,
    iteration: Iteration,
    locationID?: string
) {

    const path = locationID
        ? collection(
            db,
            "sessions",
            sessionID,
            "locations",
            locationID,
            "iterations"
        )
        : collection(
            db,
            "sessions",
            sessionID,
            "iterations"
        );

    const docRef = await addDoc(path, iteration);

    return docRef.id;
}