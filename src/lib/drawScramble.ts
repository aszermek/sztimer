import { TwistyPlayer } from "cubing/twisty";
import { events } from "@/types/events";

export function drawScramble(
    eventKey: string,
    scramble: string,
    element: HTMLElement
) {
    const event = events.find((e) => e.key === eventKey);
    if (!event) return;

    const player = new TwistyPlayer({
        puzzle: event.keyForViewer,
        alg: scramble,
        visualization: "2D",
        background: "none",
        controlPanel: "none",
    });

    element.replaceChildren(player);
}
