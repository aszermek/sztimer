import type { EventType } from "./events";

export type PenaltyType = null | "+2" | "dnf";

export interface Result {
    id?: number;
    time: number;
    penalty?: PenaltyType;
    scramble?: string;
    comment?: string;
    date: Date;
    event?: EventType;
    session?: string;
}

export type NotificationTypes = "single" | "ao5" | "ao12" | "ao50" | "ao100";

export interface ResultNotification {
    id?: number;
    type?: NotificationTypes;
    event?: EventType;
    session?: string;
}
