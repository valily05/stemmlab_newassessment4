import { addDoc, collection } from "firebase/firestore";

import { db } from "./config";
import { ActivityFeedback } from "@/types/firestore";

export async function saveActivityFeedback(feedback: ActivityFeedback) {
    const docRef = await addDoc(
        collection(db, 'activityFeedback'),
        feedback
    );

    return docRef.id;
}