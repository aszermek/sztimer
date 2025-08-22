import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { Timer } from "./Timer";
import { timerModeAtom } from "@/atoms/settingsAtoms";
import { resultsAtom } from "@/atoms/resultAtoms";
import { selectedEventAtom, selectedSessionAtom } from "@/atoms/sessionAtoms";

vi.mock("./SpacebarTimer", () => ({
    SpacebarTimer: () => <div data-testid="spacebar-timer" />,
}));
vi.mock("./TimeInput", () => ({
    TimeInput: () => <div data-testid="time-input" />,
}));
vi.mock("../results/ResultFlagger", () => ({
    ResultFlagger: () => <div data-testid="result-flagger" />,
}));

describe("Timer Component", () => {
    it('should render SpacebarTimer by default when timerMode is "spacebar"', () => {
        const store = createStore();
        store.set(timerModeAtom, "spacebar");
        store.set(resultsAtom, []); // Provide an empty array for resultsAtom
        store.set(selectedEventAtom, "333"); // Provide default value
        store.set(selectedSessionAtom, "Default"); // Provide default value

        render(
            <Provider store={store}>
                <Timer />
            </Provider>
        );

        // Assert that the correct child is in the document and the other is not
        expect(screen.getByTestId("spacebar-timer")).toBeInTheDocument();
        expect(screen.queryByTestId("time-input")).not.toBeInTheDocument();
    });

    it('should render TimeInput when timerMode is "manual"', () => {
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

        // Assert that the correct child is in the document and the other is not
        expect(screen.getByTestId("time-input")).toBeInTheDocument();
        expect(screen.queryByTestId("spacebar-timer")).not.toBeInTheDocument();
    });
});
