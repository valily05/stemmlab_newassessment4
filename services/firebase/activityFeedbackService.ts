import {
    addDoc,
    collection,
    doc,
    getDoc,
    increment,
    updateDoc,
} from "firebase/firestore";

import { ActivityFeedback } from "@/types/firestore";
import { auth, db } from "./config";

export async function saveActivityFeedback(
  feedback: ActivityFeedback,
  pointsEarned: number
  
) 

{console.log(typeof pointsEarned, pointsEarned);
  // Save feedback
  const docRef = await addDoc(
    collection(db, "activityFeedback"),
    feedback
  );

  // Update team points
  const uid = auth.currentUser?.uid;

  if (uid) {
const uid = auth.currentUser?.uid;
console.log("UID:", uid);

if (uid) {
  const userSnap = await getDoc(doc(db, "users", uid));

  console.log("User exists:", userSnap.exists());

  if (userSnap.exists()) {
    console.log("User data:", userSnap.data());

    const teamID = userSnap.data().teamID;

    console.log("TeamID:", teamID);

    if (teamID) {
      console.log("Updating team...");

      await updateDoc(doc(db, "teams", teamID), {
        totalPoints: increment(pointsEarned),
      });
const teamSnap = await getDoc(doc(db, "teams", teamID));
console.log("New total:", teamSnap.data()?.totalPoints);
      console.log("✅ Team updated!");
    } else {
      console.log("❌ No teamID found.");
    }
  }
}
  }

  return docRef.id;
}