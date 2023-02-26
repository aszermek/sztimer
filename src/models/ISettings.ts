import { EventTypes } from "./Events";

export interface ISettings {
    inspection: boolean;
    isManualEnter: boolean;
    selectedEvent: EventTypes;
    selectedSession: string;
}