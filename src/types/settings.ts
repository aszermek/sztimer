import type { EventType } from "./events";

export interface Settings {
    inspection: boolean;
    isManualEnter: boolean;
    selectedEvent: EventType;
    selectedSession: string;
}
