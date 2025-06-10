import { events } from "@/types/events";
import { randomScrambleForEvent } from "cubing/scramble";
import { TwistyPlayer } from "cubing/twisty";
import { atom } from "jotai";
import { selectedEventAtom } from "./sessionAtoms";

export const scrambleAtom = atom("");
export const prevScrambleAtom = atom("");
export const nextScrambleAtom = atom("");
export const canGetPrevScrambleAtom = atom(false);
export const isScrambleLoadingAtom = atom(false);

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

export const scrambleToClipboardAtom = atom(null, (get) => {
    const scramble = get(scrambleAtom);
    navigator.clipboard.writeText(scramble);
});

export const drawScrambleAtom = atom(null, (get) => {
    const scramble = get(scrambleAtom);
    const eventKey = get(selectedEventAtom);
    const event = events.find((e) => e.key === eventKey);
    if (!event) return;

    const viewerElement = document.getElementById("viewer");
    if (!viewerElement) return;

    const player = new TwistyPlayer({
        puzzle: event.keyForViewer,
        alg: scramble,
        visualization: "2D",
        background: "none",
        controlPanel: "none",
    });

    viewerElement.replaceChildren(player);
});
