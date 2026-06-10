import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
} from "firebase/firestore";

import { db } from "./config";
import { updateUserStreak } from "./userService";

export async function getTopTeams() {
  const q = query(
    collection(db, "teams"),
    orderBy("totalPoints", "desc"),
    limit(3)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getTeam(teamId: string) {
  const teamRef = doc(db, "teams", teamId);

  const teamSnap = await getDoc(teamRef);

  if (!teamSnap.exists()) {
    return null;
  }

  return {
    id: teamSnap.id,
    ...teamSnap.data(),
  };
}

export async function getAllTeams() {

  const q = query(
    collection(db, "teams"),
    orderBy("totalPoints", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export const getTeamMembers = async (teamID: string) => {
  const teamRef = doc(db, `teams`, teamID);
  const snap = await getDoc(teamRef);

  if(!snap.exists()) return [];

  return snap.data().members || [];
};

export const updateTeamStreak = async (teamID: string) => {
  const members = await getTeamMembers(teamID);

  if(!members||members.length===0) return;

  await Promise.all(
    members.map((uid: string) => updateUserStreak(uid))
  );
}