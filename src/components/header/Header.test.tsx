import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, createStore } from "jotai";
import { Header } from "./Header";
import {
    isRunningInspectionAtom,
    isRunningTimerAtom,
} from "@/atoms/timerAtoms";

// Mock child components that are not the focus of this test
vi.mock("../event/EventCombobox", () => ({
    EventCombobox: () => <div data-testid="event-combobox" />,
}));
vi.mock("../settings/Settings", () => ({
    Settings: () => <div data-testid="settings-component" />,
}));

describe("Header Component", () => {
    it("should render the default idle icon when no timers are running", () => {
        const store = createStore();
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        expect(screen.getByTestId("idle-icon")).toBeInTheDocument();
    });

    it("should render the inspecting icon when the inspection timer is running", () => {
        const store = createStore();
        store.set(isRunningInspectionAtom, true);
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        expect(screen.getByTestId("inspecting-icon")).toBeInTheDocument();
    });

    it("should render the running icon when the main timer is running", () => {
        const store = createStore();
        store.set(isRunningTimerAtom, true);
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        expect(screen.getByTestId("running-icon")).toBeInTheDocument();
    });

    it("should render the hover icon when the logo is hovered", async () => {
        const user = userEvent.setup();
        const store = createStore();
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        // Icon is initially idle
        expect(screen.getByTestId("idle-icon")).toBeInTheDocument();

        // Hover over the logo container
        const logoContainer = screen.getByTestId("logo-container");
        await user.hover(logoContainer);

        // Icon should now be the hover icon
        expect(screen.getByTestId("hover-icon")).toBeInTheDocument();

        // Unhover
        await user.unhover(logoContainer);

        // Icon should return to idle
        expect(screen.getByTestId("idle-icon")).toBeInTheDocument();
    });

    it("should open the settings dialog when the wrench icon is clicked", async () => {
        const user = userEvent.setup();
        const store = createStore();
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        // Dialog is initially closed
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

        // Click the wrench icon
        const wrenchIcon = screen.getByTestId("settings-wrench-icon");
        await user.click(wrenchIcon);

        // Dialog should now be open
        const dialog = await screen.findByRole("dialog");
        expect(dialog).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument(); // Check for the dialog title
    });
});
