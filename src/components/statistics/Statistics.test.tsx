import { resultsAtom } from "@/atoms/resultAtoms";
import { selectedEventAtom, selectedSessionAtom } from "@/atoms/sessionAtoms";
import type { Result } from "@/types/results";
import { render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { describe, expect, it, vi } from "vitest";
import { Statistics } from "./Statistics";

vi.mock("./LineChart", () => ({
    LineChart: () => <div data-testid="line-chart" />,
}));

const createResult = (
    time: number,
    penalty: Result["penalty"] = null
): Result => ({
    time,
    penalty,
    scramble: "",
    date: new Date(),
    event: "333",
    session: "Default",
    comment: "",
});

describe("Statistics Component", () => {
    it("should render empty values when there is no data", () => {
        const store = createStore();
        store.set(resultsAtom, []);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Default");

        render(
            <Provider store={store}>
                <Statistics />
            </Provider>
        );

        const bestSingleValue = screen.getByTestId("stat-value-Best Single");
        expect(bestSingleValue).toBeEmptyDOMElement();

        const currentAo5Value = screen.getByTestId("stat-value-Current Ao5");
        expect(currentAo5Value).toBeEmptyDOMElement();
    });

    it("should render formatted stats based on the provided results", () => {
        const store = createStore();

        const mockResults = [
            createResult(9.87),
            createResult(11.0),
            createResult(12.0),
            createResult(11.5),
            createResult(13.45),
        ];

        store.set(resultsAtom, mockResults);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Default");

        render(
            <Provider store={store}>
                <Statistics />
            </Provider>
        );

        const bestSingleValue = screen.getByTestId("stat-value-Best Single");
        expect(bestSingleValue).toHaveTextContent("9.87");

        const worstSingleValue = screen.getByTestId("stat-value-Worst Single");
        expect(worstSingleValue).toHaveTextContent("13.45");

        const bestAo5Value = screen.getByTestId("stat-value-Best Ao5");
        expect(bestAo5Value).toHaveTextContent("11.50");
    });
});
