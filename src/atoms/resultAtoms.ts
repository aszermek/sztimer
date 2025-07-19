import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { PenaltyType, Result, ResultNotification } from "../types/results";
import { getNewScrambleAtom } from "./scrambleAtoms";
import { selectedEventAtom, selectedSessionAtom } from "./sessionAtoms";

export const resultsAtom = atomWithStorage<Result[]>("results", []);
export const openResultsAtom = atom<Result[]>([]);
export const resultNotificationsAtom = atom<ResultNotification[]>([]);

export const filteredResultsAtom = atom((get) => {
    const results = get(resultsAtom);
    const event = get(selectedEventAtom);
    const session = get(selectedSessionAtom);
    return results.filter(
        (result) => result.event === event && result.session === session
    );
});

export const addResultAtom = atom(null, async (get, set, result: Result) => {
    const results = [...get(resultsAtom), result];
    set(resultsAtom, results);
    await getNewScrambleAtom.write!(get, set);
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
    }
);

export const addCommentAtom = atom(
    null,
    (get, set, { result, comment }: { result: Result; comment: string }) => {
        const results = get(resultsAtom).map((r) =>
            r === result ? { ...r, comment } : r
        );
        set(resultsAtom, results);
    }
);

export const removeResultAtom = atom(null, (get, set, result: Result) => {
    const results = get(resultsAtom).filter((r) => r !== result);
    set(resultsAtom, results);
});

export const deleteAllResultsFromSessionAtom = atom(null, (get, set) => {
    const event = get(selectedEventAtom);
    const session = get(selectedSessionAtom);
    const results = get(resultsAtom).filter(
        (result) => result.session !== session || result.event !== event
    );
    set(resultsAtom, results);
    set(resultNotificationsAtom, []);
});

export const openDetailsAtom = atom(null, (get, set, results: Result[]) => {
    set(openResultsAtom, results);
});

export const closeDetailsAtom = atom(null, (get, set) => {
    const openResults = get(openResultsAtom);
    if (openResults.length > 0) {
        set(openResultsAtom, []);
    }
});
