import { events, type EventType } from "@/types/events";
import { atom } from "jotai";

export const selectedEventAtom = atom<EventType>("333");
export const selectedSessionAtom = atom<string>("Regular");
const customSessionsAtom = atom<string[]>([]);

export const selectedEventSessionsAtom = atom((get) => {
    const selectedEvent = get(selectedEventAtom);
    const baseSessions =
        events.find((e) => e.key === selectedEvent)?.sessions ?? [];
    const custom = get(customSessionsAtom);
    return [...baseSessions, ...custom];
});

export const addNewSessionAtom = atom(null, (get, set, newSession: string) => {
    const current = get(customSessionsAtom);
    if (!current.includes(newSession)) {
        set(customSessionsAtom, [...current, newSession]);
    }
});
