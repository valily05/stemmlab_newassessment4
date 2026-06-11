// services/firebase/locationService.ts

import {
    addDoc,
    collection,
    Timestamp,
} from "firebase/firestore";

import { db } from "./config";

export interface LocationData {
  locationNo: number;

  name: string;

  latitude: number;

  longitude: number;
}

export const createLocation = async (
  sessionID: string,
  data: LocationData
) => {
  const docRef = await addDoc(
    collection(
      db,
      "sessions",
      sessionID,
      "locations"
    ),
    {
      locationNo: data.locationNo,

      name: data.name,

      latitude: data.latitude,

      longitude: data.longitude,

      createdAt: Timestamp.now(),
    }
  );

  return docRef.id;
};