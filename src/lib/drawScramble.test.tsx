import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    type MockInstance,
} from "vitest";
import { drawScramble } from "./drawScramble";

const { mockTwistyPlayerConstructor, mockTwistyPlayerInstance } = vi.hoisted(
    () => {
        const mockInstance = { id: "mock-player" };
        return {
            mockTwistyPlayerInstance: mockInstance,
            mockTwistyPlayerConstructor: vi.fn(() => mockInstance),
        };
    }
);

vi.mock("cubing/twisty", () => ({
    TwistyPlayer: mockTwistyPlayerConstructor,
}));

describe("drawScramble", () => {
    let mockElement: HTMLElement;
    let replaceChildrenSpy: MockInstance;

    beforeEach(() => {
        mockElement = document.createElement("div");
        replaceChildrenSpy = vi.spyOn(mockElement, "replaceChildren");
        mockTwistyPlayerConstructor.mockClear();
        replaceChildrenSpy.mockClear();
    });

    it("should create a TwistyPlayer and attach it to the element for a valid event", () => {
        const eventKey = "333";
        const scramble = "R U R' U'";

        drawScramble(eventKey, scramble, mockElement);

        expect(mockTwistyPlayerConstructor).toHaveBeenCalledOnce();
        expect(mockTwistyPlayerConstructor).toHaveBeenCalledWith({
            puzzle: "3x3x3",
            alg: scramble,
            visualization: "2D",
            background: "none",
            controlPanel: "none",
        });

        expect(replaceChildrenSpy).toHaveBeenCalledOnce();
        expect(replaceChildrenSpy).toHaveBeenCalledWith(
            mockTwistyPlayerInstance
        );
    });

    it("should do nothing if the eventKey is invalid", () => {
        const eventKey = "invalid-event";
        const scramble = "R U R' U'";

        drawScramble(eventKey, scramble, mockElement);

        expect(mockTwistyPlayerConstructor).not.toHaveBeenCalled();
        expect(replaceChildrenSpy).not.toHaveBeenCalled();
    });

    it("should use the correct `keyForViewer` for events like Square-1", () => {
        const eventKey = "sq1";
        const scramble = "(1,0) / (3,3) / (1,0)";

        drawScramble(eventKey, scramble, mockElement);

        expect(mockTwistyPlayerConstructor).toHaveBeenCalledOnce();
        expect(mockTwistyPlayerConstructor).toHaveBeenCalledWith(
            expect.objectContaining({
                puzzle: "square1",
            })
        );
    });
});
