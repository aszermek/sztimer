import { describe, it, expect } from "vitest";
import { createStore } from "jotai";
import {
    selectedEventAtom,
    setSelectedEventAtom,
    selectedSessionAtom,
    addNewSessionAtom,
    selectedEventSessionsAtom,
} from "./sessionAtoms";
import { prevScrambleAtom } from "./scrambleAtoms";

describe("sessionAtoms", () => {
    it("should have default values for selectedEvent and selectedSession", () => {
        const store = createStore();
        expect(store.get(selectedEventAtom)).toBe("333");
        expect(store.get(selectedSessionAtom)).toBe("Regular");
    });

    it("setSelectedEventAtom should update the event and clear the previous scramble", () => {
        const store = createStore();
        store.set(prevScrambleAtom, "A PREVIOUS SCRAMBLE");
        store.set(selectedEventAtom, "333");

        store.set(setSelectedEventAtom, "444");

        expect(store.get(selectedEventAtom)).toBe("444");
        expect(store.get(prevScrambleAtom)).toBe("");
    });

    it("addNewSessionAtom should add a new custom session", () => {
        const store = createStore();
        const initialSessions = store.get(selectedEventSessionsAtom);
        expect(initialSessions).not.toContain("My Custom Session");

        store.set(addNewSessionAtom, "My Custom Session");

        const updatedSessions = store.get(selectedEventSessionsAtom);
        expect(updatedSessions).toContain("My Custom Session");
    });

    it("addNewSessionAtom should not add a duplicate session", () => {
        const store = createStore();
        store.set(addNewSessionAtom, "My Custom Session");
        const sessions1 = store.get(selectedEventSessionsAtom);
        const count1 = sessions1.length;

        // Add the same session again
        store.set(addNewSessionAtom, "My Custom Session");
        const sessions2 = store.get(selectedEventSessionsAtom);
        const count2 = sessions2.length;

        expect(count2).toBe(count1);
    });
});
