import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { LineChart } from "./LineChart";
// --- THE FIX: Import the SOURCE atoms ---
import { resultsAtom } from "@/atoms/resultAtoms";
import { selectedEventAtom, selectedSessionAtom } from "@/atoms/sessionAtoms";
import type { Result } from "@/types/results";

vi.mock("@nivo/line", () => ({
    ResponsiveLine: () => <div data-testid="nivo-line-chart" />,
}));

const createResult = (time: number): Result => ({
    time,
    penalty: null,
    scramble: "",
    date: new Date(),
    event: "333",
    session: "Default",
    comment: "",
});

describe("LineChart Component", () => {
    it("should render nothing (null) if there is less than 2 solves", () => {
        const store = createStore();
        // Set the source atom with one result
        store.set(resultsAtom, [createResult(10)]);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Default");

        const { container } = render(
            <Provider store={store}>
                <LineChart />
            </Provider>
        );

        expect(container.firstChild).toBeNull();
    });

    it("should render the Nivo chart if there are 2 or more solves", () => {
        const store = createStore();
        // Set the source atom with two results
        store.set(resultsAtom, [createResult(10), createResult(12)]);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Default");

        render(
            <Provider store={store}>
                <LineChart />
            </Provider>
        );

        expect(screen.getByTestId("nivo-line-chart")).toBeInTheDocument();
    });
});
