import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabBar } from "./TabBar";

describe("TabBar Component", () => {
    it("should render all four tabs correctly", () => {
        render(<TabBar activeTab="timer" onChange={vi.fn()} />);

        expect(
            screen.getByRole("button", { name: /timer/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /results/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /stats/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /settings/i })
        ).toBeInTheDocument();
    });

    it("should correctly highlight the active tab using aria-current", () => {
        render(<TabBar activeTab="results" onChange={vi.fn()} />);

        const resultsTab = screen.getByRole("button", { name: /results/i });
        const timerTab = screen.getByRole("button", { name: /timer/i });

        expect(resultsTab).toHaveAttribute("aria-current", "page");
        expect(timerTab).not.toHaveAttribute("aria-current");
    });

    it("should call the onChange callback with the correct tab key when a button is clicked", async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<TabBar activeTab="timer" onChange={handleChange} />);

        const statsTabButton = screen.getByRole("button", { name: /stats/i });

        await user.click(statsTabButton);

        expect(handleChange).toHaveBeenCalledOnce();
        expect(handleChange).toHaveBeenCalledWith("stats");
    });

    it("should not call onChange for the already active tab if it is clicked", async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<TabBar activeTab="timer" onChange={handleChange} />);

        const timerTabButton = screen.getByRole("button", { name: /timer/i });
        await user.click(timerTabButton);

        expect(handleChange).toHaveBeenCalledOnce();
        expect(handleChange).toHaveBeenCalledWith("timer");
    });
});
