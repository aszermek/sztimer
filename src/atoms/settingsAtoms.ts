import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type TimerMode = "spacebar" | "manual";

export interface Settings {
    withInspection: boolean;
    timerMode: TimerMode;
}

const initialSettings: Settings = {
    withInspection: true,
    timerMode: "spacebar",
};

export const settingsAtom = atomWithStorage<Settings>(
    "sztimer-settings",
    initialSettings
);

export const withInspectionAtom = atom(
    (get) => get(settingsAtom).withInspection,
    (get, set, update: boolean) => {
        const currentSettings = get(settingsAtom);
        if (currentSettings.timerMode === "spacebar") {
            set(settingsAtom, { ...currentSettings, withInspection: update });
        }
    }
);

export const timerModeAtom = atom(
    (get) => get(settingsAtom).timerMode,
    (get, set, update: TimerMode) => {
        const currentSettings = get(settingsAtom);
        if (update === "manual") {
            set(settingsAtom, {
                ...currentSettings,
                timerMode: "manual",
                withInspection: false,
            });
        } else {
            set(settingsAtom, {
                ...currentSettings,
                timerMode: "spacebar",
                withInspection: true,
            });
        }
    }
);
