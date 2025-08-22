import * as mockAtoms from "@/tests/mocks/jotai";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "jotai";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSpacebarTimer } from "./useSpacebarTimer";

vi.mock("@/atoms/timerAtoms", () => ({
    isRunningTimerAtom: mockAtoms.isRunningTimerAtom,
    isRunningInspectionAtom: mockAtoms.isRunningInspectionAtom,
}));
vi.mock("@/atoms/resultAtoms", () => ({
    addResultAtom: mockAtoms.addResultAtom,
    filteredResultsAtom: mockAtoms.filteredResultsAtom,
}));
vi.mock("@/atoms/scrambleAtoms", () => ({
    scrambleAtom: mockAtoms.scrambleAtom,
}));
vi.mock("@/atoms/sessionAtoms", () => ({
    selectedEventAtom: mockAtoms.selectedEventAtom,
    selectedSessionAtom: mockAtoms.selectedSessionAtom,
}));

const pressSpace = () =>
    document.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
const releaseSpace = () =>
    document.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));

describe("useSpacebarTimer", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <Provider>{children}</Provider>
    );

    describe("with inspection enabled", () => {
        it("should follow the full cycle: inspect -> time -> stop", () => {
            const { result } = renderHook(
                () => useSpacebarTimer({ withInspection: true }),
                { wrapper }
            );

            act(() => {
                pressSpace();
            }); // Set state to READY
            act(() => {
                releaseSpace();
            }); // Now state is READY, so this will start inspection
            expect(result.current.displayTime).toBe("15");

            act(() => {
                vi.advanceTimersByTime(2000);
            });
            expect(result.current.displayTime).toBe("13");

            act(() => {
                pressSpace();
            }); // Set state to INSPECTING_READY
            act(() => {
                releaseSpace();
            }); // Now state is INSPECTING_READY, so this will start timer
            expect(result.current.displayTime).toBe("0.00");

            act(() => {
                vi.advanceTimersByTime(5550);
            });
            expect(result.current.displayTime).toBe("5.55");

            act(() => {
                pressSpace();
            }); // Stop timer

            expect(mockAtoms.mockAddResult).toHaveBeenCalledTimes(1);
            const addedResult = mockAtoms.mockAddResult.mock.calls[0][2];
            expect(addedResult.time).toBeCloseTo(5.55);
            expect(addedResult.penalty).toBeNull();
        });

        it("should apply a +2 penalty if inspection exceeds 15 seconds", () => {
            const { result } = renderHook(
                () => useSpacebarTimer({ withInspection: true }),
                { wrapper }
            );

            act(() => {
                pressSpace();
            });
            act(() => {
                releaseSpace();
            });
            act(() => {
                vi.advanceTimersByTime(16000);
            });
            expect(result.current.displayTime).toBe("+2");

            act(() => {
                pressSpace();
            });
            act(() => {
                releaseSpace();
            });
            act(() => {
                vi.advanceTimersByTime(1000);
            });
            act(() => {
                pressSpace();
            });

            const addedResult = mockAtoms.mockAddResult.mock.calls[0][2];
            expect(addedResult.penalty).toBe("+2");
        });

        it("should apply a DNF penalty if inspection exceeds 17 seconds", () => {
            const { result } = renderHook(
                () => useSpacebarTimer({ withInspection: true }),
                { wrapper }
            );

            act(() => {
                pressSpace();
            });
            act(() => {
                releaseSpace();
            });
            act(() => {
                vi.advanceTimersByTime(18000);
            });
            expect(result.current.displayTime).toBe("DNF");

            act(() => {
                pressSpace();
            });
            act(() => {
                releaseSpace();
            });
            act(() => {
                vi.advanceTimersByTime(1000);
            });
            act(() => {
                pressSpace();
            });

            const addedResult = mockAtoms.mockAddResult.mock.calls[0][2];
            expect(addedResult.penalty).toBe("dnf");
        });
    });

    describe("with inspection disabled", () => {
        it("should go directly to timing and stop correctly", () => {
            const { result } = renderHook(
                () => useSpacebarTimer({ withInspection: false }),
                { wrapper }
            );

            act(() => {
                pressSpace();
            });
            act(() => {
                releaseSpace();
            });
            expect(result.current.displayTime).toBe("0.00");

            act(() => {
                vi.advanceTimersByTime(3210);
            });
            expect(result.current.displayTime).toBe("3.21");

            act(() => {
                pressSpace();
            });

            expect(mockAtoms.mockAddResult).toHaveBeenCalledTimes(1);
            const addedResult = mockAtoms.mockAddResult.mock.calls[0][2];
            expect(addedResult.time).toBeCloseTo(3.21);
            expect(addedResult.penalty).toBeNull();
        });
    });
});
