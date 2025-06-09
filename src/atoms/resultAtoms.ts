import { atom } from "jotai";
import type { PenaltyType, Result, ResultNotification } from "../types/results";
import { selectedEventAtom, selectedSessionAtom } from "./sessionAtoms";

const getInitialResults = (): Result[] => {
    const stored = localStorage.getItem("results");
    return stored ? JSON.parse(stored) : [];
};

export const resultsAtom = atom<Result[]>(getInitialResults());

export const isOpenCommentInputAtom = atom(false);
export const isOpenDeleteModalAtom = atom(false);
export const isOpenResultModalAtom = atom(false);
export const openResultsAtom = atom<Result[]>([]);
export const detailsRefAtom = atom<HTMLDivElement | null>(null);
export const isCopiedDetailsAtom = atom(false);
export const resultNotificationsAtom = atom<ResultNotification[]>([]);

export const filteredResultsAtom = atom((get) => {
    const results = get(resultsAtom);
    const event = get(selectedEventAtom);
    const session = get(selectedSessionAtom);
    return results.filter(
        (result) => result.event === event && result.session === session
    );
});

const saveResultsToLocalStorage = (results: Result[]) => {
    localStorage.setItem("results", JSON.stringify(results));
};

export const addResultAtom = atom(null, (get, set, result: Result) => {
    const results = [...get(resultsAtom), result];
    set(resultsAtom, results);
    saveResultsToLocalStorage(results);
    // Optionally: trigger scramble update, PB check, etc.
});

export const addPenaltyAtom = atom(
    null,
    (
        get,
        set,
        { result, penalty }: { result: Result; penalty: PenaltyType }
    ) => {
        const results = get(resultsAtom).map((r) => {
            if (r === result) {
                let newTime = r.time;
                if (r.penalty !== "+2" && penalty === "+2") newTime += 2;
                if (r.penalty === "+2" && penalty !== "+2") newTime -= 2;
                return { ...r, penalty, time: newTime };
            }
            return r;
        });
        set(resultsAtom, results);
        saveResultsToLocalStorage(results);
    }
);

export const addCommentAtom = atom(
    null,
    (get, set, { result, comment }: { result: Result; comment: string }) => {
        const results = get(resultsAtom).map((r) =>
            r === result ? { ...r, comment } : r
        );
        set(resultsAtom, results);
        saveResultsToLocalStorage(results);
        set(isOpenCommentInputAtom, false);
    }
);

export const removeResultAtom = atom(null, (get, set, result: Result) => {
    set(isOpenResultModalAtom, false);
    const results = get(resultsAtom).filter((r) => r !== result);
    set(resultsAtom, results);
    saveResultsToLocalStorage(results);
});

export const deleteAllResultsFromSessionAtom = atom(null, (get, set) => {
    const event = get(selectedEventAtom);
    const session = get(selectedSessionAtom);
    const results = get(resultsAtom).filter(
        (result) => result.session !== session || result.event !== event
    );
    set(resultsAtom, results);
    set(resultNotificationsAtom, []);
    saveResultsToLocalStorage(results);
    set(isOpenDeleteModalAtom, false);
});

export const openDetailsAtom = atom(null, (get, set, results: Result[]) => {
    set(isOpenResultModalAtom, true);
    set(openResultsAtom, results);
});

export const copyDetailsAtom = atom(null, async (get, set) => {
    const detailsRef = get(detailsRefAtom);
    if (detailsRef) {
        await navigator.clipboard.writeText(detailsRef.innerText);
        set(isCopiedDetailsAtom, true);
    }
});

export const closeDetailsAtom = atom(null, (get, set) => {
    set(isOpenResultModalAtom, false);
    set(openResultsAtom, []);
    if (get(isCopiedDetailsAtom)) {
        set(isCopiedDetailsAtom, false);
    }
});

export const addNotificationAtom = atom(
    null,
    (get, set, notif: ResultNotification) => {
        set(resultNotificationsAtom, [...get(resultNotificationsAtom), notif]);
    }
);

export const closeResultNotificationAtom = atom(
    null,
    (get, set, notif: ResultNotification) => {
        set(
            resultNotificationsAtom,
            get(resultNotificationsAtom).filter((n) => n !== notif)
        );
    }
);

export const closeAllResultNotificationsAtom = atom(null, (_get, set) => {
    set(resultNotificationsAtom, []);
});

// Utility: Calculate average (Ao5, Ao12, etc.)
export const calculateAvg = (array: Result[]): number | string => {
    const dnfResults: Result[] = array.filter((r) => r.penalty === "dnf");
    if (dnfResults.length > 1) {
        return "DNF";
    }
    let worst: number;
    if (dnfResults.length > 0) {
        worst = dnfResults[0].time;
    } else {
        worst = Math.max(...array.map((r) => r.time));
    }

    let best: number;
    if (dnfResults.length > 0) {
        best = Math.min(
            ...array.filter((r) => r.penalty !== "dnf").map((r) => r.time)
        );
    } else {
        best = Math.min(...array.map((r) => r.time));
    }

    const avg: number =
        (array.reduce((a, b) => a + b.time, 0) - (best + worst)) /
        (array.length - 2);
    return avg;
};
