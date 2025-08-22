import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, createStore } from "jotai";
import { EventCombobox } from "./EventCombobox";
import { selectedEventAtom } from "@/atoms/sessionAtoms";

describe("EventCombobox", () => {
    it("should render with the default event selected", () => {
        const store = createStore();
        // The default value of selectedEventAtom is '333'
        render(
            <Provider store={store}>
                <EventCombobox />
            </Provider>
        );

        // Find the button that opens the combobox. It should display the label for '333'.
        const comboboxTrigger = screen.getByRole("combobox");
        expect(comboboxTrigger).toBeInTheDocument();
        // Check that the text inside the button is correct
        expect(within(comboboxTrigger).getByText("3x3x3")).toBeInTheDocument();
    });

    it("should open the list of events when clicked", async () => {
        const user = userEvent.setup();
        render(
            <Provider>
                <EventCombobox />
            </Provider>
        );

        const comboboxTrigger = screen.getByRole("combobox");
        await user.click(comboboxTrigger);

        // After clicking, the list of options should be visible.
        // We can find an option by its role and name.
        const option444 = await screen.findByRole("option", {
            name: /4x4x4/i,
        });
        expect(option444).toBeInTheDocument();
    });

    it("should update the selectedEventAtom when a new event is chosen", async () => {
        const user = userEvent.setup();
        const store = createStore();
        render(
            <Provider store={store}>
                <EventCombobox />
            </Provider>
        );

        // 1. Check the initial state of the atom
        expect(store.get(selectedEventAtom)).toBe("333");

        // 2. Simulate the user interaction
        const comboboxTrigger = screen.getByRole("combobox");
        await user.click(comboboxTrigger);
        const option444 = await screen.findByRole("option", {
            name: /4x4x4/i,
        });
        await user.click(option444);

        // 3. Assert that the UI has updated
        // The popover should close, and the button text should change.
        expect(screen.queryByRole("option")).not.toBeInTheDocument();
        expect(within(comboboxTrigger).getByText("4x4x4")).toBeInTheDocument();

        // 4. Assert that the underlying Jotai atom has been updated
        expect(store.get(selectedEventAtom)).toBe("444");
    });
});
