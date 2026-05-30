import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import { db } from "./config";
import { UserProfile } from "@/types/UserProfile";

export async function createUserProfile(userData: UserProfile) {
    try {
        await setDoc(
            doc(db, "users", userData.uid),
            {
                ...userData,
                createdAt: serverTimestamp(),
                lastUpdate: serverTimestamp(),
            }
        );
    } catch(error) {
        console.error("Error creating user profile:", error);
        throw error;
    }
}

export async function getUserProfile(uid: string) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if(!docSnap.exists()) {
            return null;
        }

        return docSnap.data() as UserProfile;
    } catch(error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
    try {
        await updateDoc(
            doc(db, "users", uid),
            {
                ...data,
                lastUpdate: serverTimestamp(),
            }
        );
    } catch(error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}