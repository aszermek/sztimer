import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimeInput } from "./TimeInput";

describe("TimeInput", () => {
    it("should call onSubmit with correctly parsed time in seconds", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();
        render(<TimeInput onSubmit={handleSubmit} />);

        const input = screen.getByRole("textbox");
        await user.type(input, "1234");
        await user.type(input, "{enter}");

        expect(handleSubmit).toHaveBeenCalledWith({
            timeInSeconds: 12.34,
            penalty: null,
        });
    });

    it("should parse time with minutes and colons correctly", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();
        render(<TimeInput onSubmit={handleSubmit} />);

        const input = screen.getByRole("textbox");
        await user.type(input, "1:30.61");
        await user.type(input, "{enter}");

        expect(handleSubmit).toHaveBeenCalledWith({
            timeInSeconds: 90.61,
            penalty: null,
        });
    });

    it("should handle a +2 penalty correctly", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();
        render(<TimeInput onSubmit={handleSubmit} />);

        const input = screen.getByRole("textbox");
        await user.type(input, "10.55+");
        await user.type(input, "{enter}");

        expect(handleSubmit).toHaveBeenCalledWith({
            timeInSeconds: 10.55,
            penalty: "+2",
        });
    });

    it("should handle a DNF penalty correctly", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();
        render(<TimeInput onSubmit={handleSubmit} />);

        const input = screen.getByRole("textbox");
        await user.type(input, "dnf(25.12)");
        await user.type(input, "{enter}");

        expect(handleSubmit).toHaveBeenCalledWith({
            timeInSeconds: 25.12,
            penalty: "dnf",
        });
    });

    it("should display an error message for invalid input", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();
        render(<TimeInput onSubmit={handleSubmit} />);

        const input = screen.getByRole("textbox");
        await user.type(input, "invalid-text");
        await user.type(input, "{enter}");

        expect(handleSubmit).not.toHaveBeenCalled();
        expect(screen.getByText("Invalid format")).toBeInTheDocument();
    });

    it("should clear the error message when the user types again", async () => {
        const user = userEvent.setup();
        render(<TimeInput onSubmit={vi.fn()} />);

        const input = screen.getByRole("textbox");
        await user.type(input, "invalid-text");
        await user.type(input, "{enter}");

        const errorMessage = screen.getByText("Invalid format");
        expect(errorMessage).toBeInTheDocument();

        await user.type(input, "1");
        expect(screen.queryByText("Invalid format")).not.toBeInTheDocument();
    });
});
