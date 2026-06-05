import { Timestamp } from "firebase/firestore";

export interface UserProfile {
    uid: string;
    fullName: string;
    email: string;
    role: "Student";

    teamID?: string;

    createdAt?: Timestamp;
    lastUpdate?: Timestamp;
}