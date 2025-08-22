import { atom } from "jotai";
import { vi } from "vitest";
import type { Result } from "@/types/results";

export const mockAddResult = vi.fn();

export const isRunningTimerAtom = atom(false);
export const isRunningInspectionAtom = atom(false);
export const addResultAtom = atom(null, mockAddResult);
export const scrambleAtom = atom("R U R' U'");
export const selectedEventAtom = atom("333");
export const selectedSessionAtom = atom("Default");
export const filteredResultsAtom = atom<Result[]>([]);
