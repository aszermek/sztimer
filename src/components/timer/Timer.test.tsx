import { resultsAtom } from "@/atoms/resultAtoms";
import { selectedEventAtom, selectedSessionAtom } from "@/atoms/sessionAtoms";
import { timerModeAtom } from "@/atoms/settingsAtoms";
import type { PenaltyType, Result } from "@/types/results";
import { act, render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { describe, expect, it, vi } from "vitest";
import { Timer } from "./Timer";

interface MockTimeInputProps {
    onSubmit: (data: { timeInSeconds: number; penalty: PenaltyType }) => void;
}

const mockOnSubmit = vi.fn();

vi.mock("./TimeInput", () => ({
    TimeInput: (props: MockTimeInputProps) => {
        mockOnSubmit.mockImplementation(props.onSubmit);
        return <div data-testid="time-input" />;
    },
}));

vi.mock("./SpacebarTimer", () => ({
    SpacebarTimer: () => <div data-testid="spacebar-timer" />,
}));
vi.mock("../results/ResultFlagger", () => ({
    ResultFlagger: () => <div data-testid="result-flagger" />,
}));

const { mockAddResult } = vi.hoisted(() => ({ mockAddResult: vi.fn() }));
vi.mock("@/atoms/resultAtoms", async (importOriginal) => {
    const original = await importOriginal<
        typeof import("@/atoms/resultAtoms")
    >();
    return {
        ...original,
        addResultAtom: { ...original.addResultAtom, write: mockAddResult },
    };
});

const createResult = (time: number): Result => ({
    time,
    penalty: null,
    scramble: "",
    date: new Date(),
    event: "333",
    session: "Default",
    comment: "",
});

describe("Timer Component", () => {
    describe('when timerMode is "spacebar"', () => {
        it("should render SpacebarTimer and ResultFlagger", () => {
            const store = createStore();
            store.set(timerModeAtom, "spacebar");
            store.set(resultsAtom, [createResult(12.34)]); // Add a result to show the flagger
            store.set(selectedEventAtom, "333");
            store.set(selectedSessionAtom, "Default");

            render(
                <Provider store={store}>
                    <Timer />
                </Provider>
            );

            expect(screen.getByTestId("spacebar-timer")).toBeInTheDocument();
            expect(screen.getByTestId("result-flagger")).toBeInTheDocument();
            expect(screen.queryByTestId("time-input")).not.toBeInTheDocument();
        });
    });

    describe('when timerMode is "manual"', () => {
        it("should render TimeInput and NOT the latest result when there are no results", () => {
            const store = createStore();
            store.set(timerModeAtom, "manual");
            store.set(resultsAtom, []); // NO results
            store.set(selectedEventAtom, "333");
            store.set(selectedSessionAtom, "Default");

            render(
                <Provider store={store}>
                    <Timer />
                </Provider>
            );

            expect(screen.getByTestId("time-input")).toBeInTheDocument();
            expect(
                screen.queryByText(/latest result/i)
            ).not.toBeInTheDocument();
            expect(
                screen.queryByTestId("result-flagger")
            ).not.toBeInTheDocument();
        });

        it("should render TimeInput AND the latest result when results exist", () => {
            const store = createStore();
            store.set(timerModeAtom, "manual");
            store.set(resultsAtom, [createResult(12.34)]);
            store.set(selectedEventAtom, "333");
            store.set(selectedSessionAtom, "Default");

            render(
                <Provider store={store}>
                    <Timer />
                </Provider>
            );

            expect(screen.getByTestId("time-input")).toBeInTheDocument();
            expect(screen.getByText(/latest result/i)).toBeInTheDocument();
            expect(screen.getByText("12.34")).toBeInTheDocument();
            expect(screen.getByTestId("result-flagger")).toBeInTheDocument();
        });

        it("should call addResult when the TimeInput form is submitted", () => {
            const store = createStore();
            store.set(timerModeAtom, "manual");
            store.set(resultsAtom, []);
            store.set(selectedEventAtom, "333");
            store.set(selectedSessionAtom, "Default");

            render(
                <Provider store={store}>
                    <Timer />
                </Provider>
            );

            const submissionData = {
                timeInSeconds: 15.55,
                penalty: "+2" as const,
            };

            // Simulate the child component calling its onSubmit prop
            act(() => {
                mockOnSubmit(submissionData);
            });

            // Assert that the `addResultAtom` was called with a fully formed Result object
            expect(mockAddResult).toHaveBeenCalledOnce();
            const calledWith = mockAddResult.mock.calls[0][2]; // [get, set, result]
            expect(calledWith).toMatchObject({
                time: 15.55,
                penalty: "+2",
                event: "333",
                session: "Default",
            });
        });
    });
});
