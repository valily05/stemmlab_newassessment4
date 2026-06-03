import { Timestamp } from "firebase/firestore";

export interface UserProfile {
    uid: string;
    fullName: string;
    email: string;
    role: "Student";
    //add other info later
    createdAt?: Timestamp;
    lastUpdate?: Timestamp;
}