import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
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
  const teamRef = doc(db, "teams", teamID);
  const snap = await getDoc(teamRef);

  if (!snap.exists()) return [];

  return snap.data().members || [];
};

export const updateTeamStreak = async (teamID: string) => {
  const members = await getTeamMembers(teamID);

  if (!members || members.length === 0) return;

  await Promise.all(
    members.map((uid: string) => updateUserStreak(uid))
  );
};

/* ===========================
   CREATE TEAM
=========================== */

export const createTeam = async (
  teamCode: string,
  teamName: string,
  creatorId: string
) => {
  if (!teamName.trim()) {
    throw new Error("Please enter a team name.");
  }

  // Check if code already exists
  const existing = await getDocs(
    query(
      collection(db, "teams"),
      where("teamCode", "==", teamCode)
    )
  );

  if (!existing.empty) {
    throw new Error("Team code already exists.");
  }

  // Create team
  const teamRef = await addDoc(collection(db, "teams"), {
    teamName,
    teamCode,
    creatorId,
    members: [creatorId],
    totalPoints: 0,
    createdAt: serverTimestamp(),
  });

  // Update user with team ID
  await updateDoc(doc(db, "users", creatorId), {
    teamID: teamRef.id,
  });

  return teamRef.id;
};