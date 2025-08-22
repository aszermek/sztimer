import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "jotai";
import { SpacebarTimer } from "./SpacebarTimer";
import { useSpacebarTimer } from "@/hooks/useSpacebarTimer";

// Mock the hook that provides the logic and data to the component
vi.mock("@/hooks/useSpacebarTimer", () => ({
    useSpacebarTimer: vi.fn(),
}));

describe("SpacebarTimer Component", () => {
    // Cast the mock to the correct type for TypeScript so we can use .mockReturnValue
    const useSpacebarTimerMock = vi.mocked(useSpacebarTimer);

    it("should display the time returned by the hook", () => {
        // Arrange: Configure the mock hook to return a specific value for this test
        useSpacebarTimerMock.mockReturnValue({
            displayTime: "12.34",
            timerClassName: "",
        });

        // Act: Render the component
        render(
            <Provider>
                <SpacebarTimer />
            </Provider>
        );

        // Assert: Check if the rendered output contains the mocked value
        const timerDisplay = screen.getByText("12.34");
        expect(timerDisplay).toBeInTheDocument();
    });

    it("should apply the className returned by the hook", () => {
        // Arrange: Configure the mock hook to return a different value
        useSpacebarTimerMock.mockReturnValue({
            displayTime: "0.00",
            timerClassName: "text-green-500", // The class for when spacebar is held
        });

        // Act: Render the component
        render(
            <Provider>
                <SpacebarTimer />
            </Provider>
        );

        // Assert: Check if the rendered element has the correct class
        const timerDisplay = screen.getByText("0.00");
        expect(timerDisplay).toHaveClass("text-green-500");
    });
});
