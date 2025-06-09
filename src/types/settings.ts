import type { EventType } from "./events";

export interface ISettings {
    inspection: boolean;
    isManualEnter: boolean;
    selectedEvent: EventType;
    selectedSession: string;
}
