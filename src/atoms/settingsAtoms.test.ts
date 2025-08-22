import { describe, it, expect } from "vitest";
import { createStore } from "jotai";
import {
    settingsAtom,
    timerModeAtom,
    withInspectionAtom,
} from "./settingsAtoms";

describe("settingsAtoms", () => {
    it("should initialize with default settings", () => {
        const store = createStore();
        const settings = store.get(settingsAtom);
        expect(settings.timerMode).toBe("spacebar");
        expect(settings.withInspection).toBe(true);
    });

    it("should switch to manual mode and force inspection off", () => {
        const store = createStore();
        store.set(timerModeAtom, "manual");

        const settings = store.get(settingsAtom);
        expect(settings.timerMode).toBe("manual");
        expect(settings.withInspection).toBe(false);
    });

    it("should switch back to spacebar mode and re-enable inspection", () => {
        const store = createStore();
        // Start in manual mode
        store.set(timerModeAtom, "manual");
        // Switch back
        store.set(timerModeAtom, "spacebar");

        const settings = store.get(settingsAtom);
        expect(settings.timerMode).toBe("spacebar");
        expect(settings.withInspection).toBe(true);
    });

    it("should prevent enabling inspection when in manual mode", () => {
        const store = createStore();
        store.set(timerModeAtom, "manual");

        // Attempt to enable inspection (should be ignored)
        store.set(withInspectionAtom, true);

        const settings = store.get(settingsAtom);
        expect(settings.withInspection).toBe(false);
    });

    it("should allow toggling inspection when in spacebar mode", () => {
        const store = createStore();
        store.set(timerModeAtom, "spacebar");

        store.set(withInspectionAtom, false);
        expect(store.get(withInspectionAtom)).toBe(false);

        store.set(withInspectionAtom, true);
        expect(store.get(withInspectionAtom)).toBe(true);
    });
});
