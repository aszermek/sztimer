import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { ResultFlagger } from "./ResultFlagger";
import type { Result } from "@/types/results";

const { mockAddPenalty, mockAddComment, mockRemoveResult, mockCloseDetails } =
    vi.hoisted(() => ({
        mockAddPenalty: vi.fn(),
        mockAddComment: vi.fn(),
        mockRemoveResult: vi.fn(),
        mockCloseDetails: vi.fn(),
    }));

vi.mock("@/atoms/resultAtoms", async (importOriginal) => {
    const original = await importOriginal<
        typeof import("@/atoms/resultAtoms")
    >();

    return {
        ...original,
        addPenaltyAtom: { ...original.addPenaltyAtom, write: mockAddPenalty },
        addCommentAtom: { ...original.addCommentAtom, write: mockAddComment },
        removeResultAtom: {
            ...original.removeResultAtom,
            write: mockRemoveResult,
        },
        closeDetailsAtom: {
            ...original.closeDetailsAtom,
            write: mockCloseDetails,
        },
    };
});

const testResult: Result = {
    time: 12.34,
    penalty: null,
    scramble: "R U R'",
    date: new Date(),
    event: "333",
    session: "Default",
    comment: "",
};

describe("ResultFlagger Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render nothing if no result is provided", () => {
        const { container } = render(
            <Provider>
                <ResultFlagger result={undefined} />
            </Provider>
        );
        expect(container.firstChild).toBeNull();
    });

    it("should call addPenalty with the correct penalty when a penalty button is clicked", async () => {
        const user = userEvent.setup();
        render(
            <Provider>
                <ResultFlagger result={testResult} />
            </Provider>
        );

        const dnfButton = screen.getByRole("button", { name: /mark as dnf/i });
        await user.click(dnfButton);

        expect(mockAddPenalty).toHaveBeenCalledOnce();
        expect(mockAddPenalty).toHaveBeenCalledWith(
            expect.any(Function),
            expect.any(Function),
            { result: testResult, penalty: "dnf" }
        );
    });

    it("should call removeResult and closeDetails when the delete button is clicked", async () => {
        const user = userEvent.setup();
        render(
            <Provider>
                <ResultFlagger result={testResult} />
            </Provider>
        );

        const deleteButton = screen.getByRole("button", {
            name: /delete result/i,
        });
        await user.click(deleteButton);

        expect(mockRemoveResult).toHaveBeenCalledOnce();
        expect(mockRemoveResult).toHaveBeenCalledWith(
            expect.any(Function),
            expect.any(Function),
            testResult
        );
        expect(mockCloseDetails).toHaveBeenCalledOnce();
    });

    it("should open the comment input when the comment button is clicked", async () => {
        const user = userEvent.setup();
        render(
            <Provider>
                <ResultFlagger result={testResult} />
            </Provider>
        );

        const commentButton = screen.getByRole("button", {
            name: /toggle comment/i,
        });
        await user.click(commentButton);

        expect(
            screen.getByPlaceholderText(/add a comment/i)
        ).toBeInTheDocument();
    });

    describe("when comment input is open", () => {
        it("should call addComment when submitting a new comment", async () => {
            const user = userEvent.setup();
            render(
                <Provider>
                    <ResultFlagger result={testResult} />
                </Provider>
            );

            await user.click(
                screen.getByRole("button", { name: /toggle comment/i })
            );
            const input = screen.getByPlaceholderText(/add a comment/i);
            const submitButton = screen.getByRole("button", {
                name: /submit comment/i,
            });

            await user.type(input, "New comment");
            await user.click(submitButton);

            expect(mockAddComment).toHaveBeenCalledOnce();
            expect(mockAddComment).toHaveBeenCalledWith(
                expect.any(Function),
                expect.any(Function),
                { result: testResult, comment: "New comment" }
            );
            expect(
                screen.queryByPlaceholderText(/add a comment/i)
            ).not.toBeInTheDocument();
        });

        it("should close the comment input when the cancel button is clicked", async () => {
            const user = userEvent.setup();
            render(
                <Provider>
                    <ResultFlagger result={testResult} />
                </Provider>
            );

            await user.click(
                screen.getByRole("button", { name: /toggle comment/i })
            );
            expect(
                screen.getByPlaceholderText(/add a comment/i)
            ).toBeInTheDocument();

            const cancelButton = screen.getByRole("button", {
                name: /cancel comment/i,
            });
            await user.click(cancelButton);

            expect(
                screen.queryByPlaceholderText(/add a comment/i)
            ).not.toBeInTheDocument();
        });
    });
});
