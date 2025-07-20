import { atom } from "jotai";
import { events, type EventType } from "@/types/events";
import { prevScrambleAtom } from "./scrambleAtoms";

export const selectedEventAtom = atom<EventType>("333");

export const setSelectedEventAtom = atom(
    null,
    (get, set, newEvent: EventType) => {
        set(selectedEventAtom, newEvent);
        set(prevScrambleAtom, "");
    }
);

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
