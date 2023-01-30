import { EventTypes } from "./Events";

export type PenaltyTypes = null | "+2" | "dnf";

export interface IResult {
    id?: number;
    time: number;
    penalty?: PenaltyTypes;
    scramble?: string;
    comment?: string;
    date: Date;
    event?: EventTypes;
    session?: string;
}

export type NotificationTypes = "single" | "ao5" | "ao12" | "ao50" | "ao100";

export interface IResultNotification {
    id?: number;
    type?: NotificationTypes;
    event?: EventTypes;
    session?: string;
}
