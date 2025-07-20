import { randomScrambleForEvent } from "cubing/scramble";
import { atom } from "jotai";
import { selectedEventAtom } from "./sessionAtoms";

export const scrambleAtom = atom("");
export const prevScrambleAtom = atom("");
export const nextScrambleAtom = atom("");
export const canGetPrevScrambleAtom = atom(false);
export const isScrambleLoadingAtom = atom(false);

export const getFirstScrambleAtom = atom(null, async (get, set) => {
    set(isScrambleLoadingAtom, true);

    const eventId = get(selectedEventAtom);
    const scramble = (await randomScrambleForEvent(eventId)).toString();

    set(scrambleAtom, scramble);
    set(isScrambleLoadingAtom, false);
});

export const getNewScrambleAtom = atom(null, async (get, set) => {
    set(isScrambleLoadingAtom, true);
    const current = get(scrambleAtom);
    set(prevScrambleAtom, current);
    set(canGetPrevScrambleAtom, true);

    const eventId = get(selectedEventAtom);
    const scramble = (await randomScrambleForEvent(eventId)).toString();
    set(scrambleAtom, scramble);
    set(isScrambleLoadingAtom, false);
});

export const goToPrevScrambleAtom = atom(null, (get, set) => {
    const prev = get(prevScrambleAtom);
    const current = get(scrambleAtom);
    set(nextScrambleAtom, current);
    set(scrambleAtom, prev);
    set(canGetPrevScrambleAtom, false);
});

export const goToNextScrambleAtom = atom(null, async (get, set) => {
    const next = get(nextScrambleAtom);
    const current = get(scrambleAtom);

    if (next) {
        set(scrambleAtom, next);
        set(prevScrambleAtom, current);
        set(nextScrambleAtom, "");
        set(canGetPrevScrambleAtom, true);
    } else {
        await getNewScrambleAtom.write!(get, set);
    }
});
