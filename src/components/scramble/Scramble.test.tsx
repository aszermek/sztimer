import {
    canGetPrevScrambleAtom,
    isScrambleLoadingAtom,
    scrambleAtom,
} from "@/atoms/scrambleAtoms";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, createStore } from "jotai";
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
    type Mock,
} from "vitest";
import { Scramble } from "./Scramble";

const { mockGetFirstScramble, mockGoToPrevScramble, mockGoToNextScramble } =
    vi.hoisted(() => ({
        mockGetFirstScramble: vi.fn(),
        mockGoToPrevScramble: vi.fn(),
        mockGoToNextScramble: vi.fn(),
    }));

vi.mock("@/atoms/scrambleAtoms", async (importOriginal) => {
    const original = await importOriginal<
        typeof import("@/atoms/scrambleAtoms")
    >();
    return {
        ...original,
        getFirstScrambleAtom: { write: mockGetFirstScramble },
        goToPrevScrambleAtom: { write: mockGoToPrevScramble },
        goToNextScrambleAtom: { write: mockGoToNextScramble },
    };
});

describe("Scramble Component", () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore();
        vi.clearAllMocks();
    });

    // This hook ensures any spies we create are restored after each test
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should call getFirstScramble on initial render", () => {
        render(
            <Provider store={store}>
                <Scramble />
            </Provider>
        );
        expect(mockGetFirstScramble).toHaveBeenCalledOnce();
    });

    it("should display the loading skeleton when isLoading is true", () => {
        store.set(isScrambleLoadingAtom, true);
        render(
            <Provider store={store}>
                <Scramble />
            </Provider>
        );
        expect(screen.getByTestId("scramble-skeleton")).toBeInTheDocument();
    });

    it("should display the scramble and correct button states when not loading", () => {
        store.set(scrambleAtom, "R U R' U'");
        store.set(isScrambleLoadingAtom, false);
        store.set(canGetPrevScrambleAtom, false);
        render(
            <Provider store={store}>
                <Scramble />
            </Provider>
        );

        // Use getAllByText which returns an array. Assert that at least one exists.
        const scrambleElements = screen.getAllByText("R U R' U'");
        expect(scrambleElements.length).toBeGreaterThan(0);

        // All buttons with this label should be disabled.
        const prevButtons = screen.getAllByRole("button", {
            name: /previous scramble/i,
        });
        prevButtons.forEach((button) => expect(button).toBeDisabled());
    });

    it("should call goToNextScramble when the next button is clicked", async () => {
        const user = userEvent.setup();
        render(
            <Provider store={store}>
                <Scramble />
            </Provider>
        );

        const nextButtons = screen.getAllByRole("button", {
            name: /next scramble/i,
        });
        await user.click(nextButtons[0]);

        expect(mockGoToNextScramble).toHaveBeenCalledOnce();
    });

    it("should call goToPrevScramble when the previous button is clicked", async () => {
        const user = userEvent.setup();
        store.set(canGetPrevScrambleAtom, true);
        render(
            <Provider store={store}>
                <Scramble />
            </Provider>
        );

        const prevButtons = screen.getAllByRole("button", {
            name: /previous scramble/i,
        });
        expect(prevButtons[0]).toBeEnabled();
        await user.click(prevButtons[0]);

        expect(mockGoToPrevScramble).toHaveBeenCalledOnce();
    });

    it("should copy the scramble to the clipboard when the scramble text is clicked", async () => {
        const clipboardSpy = vi
            .spyOn(navigator.clipboard, "writeText")
            .mockImplementation(async () => {});

        const user = userEvent.setup();
        const scrambleText = "F R U R' U' F'";
        store.set(scrambleAtom, scrambleText);
        render(
            <Provider store={store}>
                <Scramble />
            </Provider>
        );

        const scrambleElements = screen.getAllByTestId("scramble-text");

        await user.click(scrambleElements[0]);

        expect(clipboardSpy).toHaveBeenCalledOnce();
        expect(clipboardSpy).toHaveBeenCalledWith(scrambleText);
    });
});
