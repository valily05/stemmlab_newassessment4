import { Timestamp } from "firebase/firestore";

export interface Team {
    teamName: string;
    teamCode: string;
    teamPhoto?: string;
    leaderID: string;
    members: string[];
    totalPoints: number;
    createdAt: Timestamp;
}

//Session Insights (Activity-specific results)
//e.g. Activity 1: Best time & Avg accuracy, Activity 2: Highest noise level & Lowest Noise level
export interface SessionInsight {
    [key: string]: string | number;
}

export interface Session {
    teamID: string;
    activityID: number;//int
    experimentTime: number;//int in seconds
    totalIterations: number;//int
    pointsEarned: number;//int
    completedAt: Timestamp;
    
    insights: SessionInsight;
}

//Iteration
//Stored in: sessions/{sessionId}/iterations
export interface Iteration {
    iterationNo: number;//int
    videoURL?: string;

    data: Record<string, any>;
}

export interface ActivityFeedback {
    sessionID: string;
    activityID: string;
    rating: number;
    whatDidYouLike: string;
    whatDifficulties: string;
    submittedAt: Timestamp;
}