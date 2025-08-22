import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { Settings } from "./Settings";

describe("Settings", () => {
    it("should render with default settings correctly", () => {
        render(
            <Provider>
                <Settings />
            </Provider>
        );

        // Check the ToggleGroup for the default timer mode
        const spacebarButton = screen.getByRole("radio", {
            name: /spacebar timer/i,
        });
        const manualButton = screen.getByRole("radio", {
            name: /manual time input/i,
        });
        expect(spacebarButton).toHaveAttribute("data-state", "on");
        expect(manualButton).toHaveAttribute("data-state", "off");

        // Check the Switch for the default inspection setting
        const inspectionSwitch = screen.getByRole("switch", {
            name: /use inspection/i,
        });
        expect(inspectionSwitch).toBeChecked();
        expect(inspectionSwitch).toBeEnabled();
    });

    it("should disable the inspection switch when manual mode is selected", async () => {
        const user = userEvent.setup();
        render(
            <Provider>
                <Settings />
            </Provider>
        );

        const manualButton = screen.getByRole("radio", {
            name: /manual time input/i,
        });
        const inspectionSwitch = screen.getByRole("switch", {
            name: /use inspection/i,
        });

        // User clicks the 'Manual Input' button
        await user.click(manualButton);

        // Assert that the UI has updated correctly
        expect(manualButton).toHaveAttribute("data-state", "on");
        expect(inspectionSwitch).toBeDisabled();
        // The atom logic forces it to be unchecked
        expect(inspectionSwitch).not.toBeChecked();
    });

    it("should re-enable the inspection switch when switching back to spacebar mode", async () => {
        const user = userEvent.setup();
        render(
            <Provider>
                <Settings />
            </Provider>
        );

        const spacebarButton = screen.getByRole("radio", {
            name: /spacebar timer/i,
        });
        const manualButton = screen.getByRole("radio", {
            name: /manual time input/i,
        });
        const inspectionSwitch = screen.getByRole("switch", {
            name: /use inspection/i,
        });

        // 1. Switch to manual mode first to disable the switch
        await user.click(manualButton);
        expect(inspectionSwitch).toBeDisabled();

        // 2. Switch back to spacebar mode
        await user.click(spacebarButton);

        // Assert that the switch is now enabled and checked again
        expect(spacebarButton).toHaveAttribute("data-state", "on");
        expect(inspectionSwitch).toBeEnabled();
        expect(inspectionSwitch).toBeChecked();
    });

    it("should allow toggling inspection when in spacebar mode", async () => {
        const user = userEvent.setup();
        render(
            <Provider>
                <Settings />
            </Provider>
        );

        const inspectionSwitch = screen.getByRole("switch", {
            name: /use inspection/i,
        });

        // It's checked by default
        expect(inspectionSwitch).toBeChecked();

        // Click to uncheck it
        await user.click(inspectionSwitch);
        expect(inspectionSwitch).not.toBeChecked();

        // Click again to re-check it
        await user.click(inspectionSwitch);
        expect(inspectionSwitch).toBeChecked();
    });
});
