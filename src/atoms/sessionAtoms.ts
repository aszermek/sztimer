import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { events, type EventType } from "@/types/events";
import { prevScrambleAtom } from "./scrambleAtoms";

export const selectedSessionAtom = atomWithStorage<string>(
    "selectedSession",
    "Regular"
);

const baseSelectedEventAtom = atomWithStorage<EventType>(
    "selectedEvent",
    "333"
);

export const selectedEventAtom = atom(
    (get) => get(baseSelectedEventAtom),
    (_, set, newEvent: EventType) => {
        set(baseSelectedEventAtom, newEvent);
        set(selectedSessionAtom, "Regular");
        set(prevScrambleAtom, "");
    }
);

const customSessionsAtom = atom<string[]>([]);

export const selectedEventSessionsAtom = atom((get) => {
    const selectedEvent = get(selectedEventAtom);
    const baseSessions =
        events.find((e) => e.key === selectedEvent)?.sessions ?? [];
    const custom = get(customSessionsAtom);
    return [...new Set([...baseSessions, ...custom])];
});

export const addNewSessionAtom = atom(null, (get, set, newSession: string) => {
    const current = get(customSessionsAtom);
    if (!current.includes(newSession)) {
        set(customSessionsAtom, [...current, newSession]);
    }
});

export const removeSessionAtom = atom(
    null,
    (get, set, sessionToRemove: string) => {
        const currentCustom = get(customSessionsAtom);
        set(
            customSessionsAtom,
            currentCustom.filter((s) => s !== sessionToRemove)
        );
        if (get(selectedSessionAtom) === sessionToRemove) {
            set(selectedSessionAtom, "Regular");
        }
    }
);
