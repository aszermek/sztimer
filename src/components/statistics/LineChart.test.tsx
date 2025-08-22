import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { LineChart } from "./LineChart";
import { resultsAtom } from "@/atoms/resultAtoms";
import { selectedEventAtom, selectedSessionAtom } from "@/atoms/sessionAtoms";
import type { Result } from "@/types/results";
import React from "react";

interface MockResponsiveLineProps {
    sliceTooltip: (props: {
        slice: {
            points: {
                seriesId: string;
                seriesColor: string;
                data: { x: number; y: number };
            }[];
        };
    }) => React.ReactElement;
}

const mockResponsiveLine = vi.fn();
vi.mock("@nivo/line", () => ({
    ResponsiveLine: (props: unknown) => {
        const typedProps = props as MockResponsiveLineProps;
        mockResponsiveLine(typedProps);
        return <div data-testid="nivo-line-chart" />;
    },
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
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore();
        vi.clearAllMocks();
    });

    it("should render nothing (null) if there is less than 2 solves", () => {
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

    it("should pass a sliceTooltip function that renders correct data", () => {
        store.set(resultsAtom, [
            createResult(10),
            createResult(11),
            createResult(12),
            createResult(13),
            createResult(14),
        ]);
        store.set(selectedEventAtom, "333");
        store.set(selectedSessionAtom, "Default");

        render(
            <Provider store={store}>
                <LineChart />
            </Provider>
        );

        const passedProps = mockResponsiveLine.mock.calls[0][0];
        const TooltipComponent = passedProps.sliceTooltip;

        const mockSlice = {
            points: [
                {
                    seriesId: "Single",
                    seriesColor: "#ff0000",
                    data: { x: 5, y: 14.123 },
                },
                {
                    seriesId: "Ao5",
                    seriesColor: "#0000ff",
                    data: { x: 5, y: 12.0 },
                },
            ],
        };

        const { getByText } = render(<TooltipComponent slice={mockSlice} />);

        expect(getByText("Solve 5")).toBeInTheDocument();
        expect(getByText("Single:")).toBeInTheDocument();
        expect(getByText("14.12")).toBeInTheDocument();
        expect(getByText("Ao5:")).toBeInTheDocument();
        expect(getByText("12.00")).toBeInTheDocument();
    });
});
