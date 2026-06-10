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

export const updateUserStreak = async (uid: string) => {
    const userRef = doc(db, `users`, uid);
    const userSnap = await getDoc(userRef);

    if(!userSnap.exists()) return;

    const data = userSnap.data();

    let streak = data.streak || 0;
    const lastActivityDate = data.lastActivityDate;

    const today = new Date();

    if(!lastActivityDate) {
        streak = 1;
    } else {
        const lastDate = lastActivityDate.toDate();

        const diffHours =
            (today.getTime() - lastDate.getTime())/(1000 * 60 * 60);

        if (diffHours >= 24 && diffHours < 48) {
            streak++;
        } else if (diffHours >= 48) {
            streak = 1;
        }
    }

    await updateDoc(userRef, {
        streak,
        lastActivityDate: serverTimestamp(),
    });
};