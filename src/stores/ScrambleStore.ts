import { TwistyPlayer } from "cubing/twisty";
import { makeAutoObservable } from "mobx";
import { Events } from "../models/Events";
import ScrambleService from "../services/ScrambleService";
import MainStore from "./MainStore";

export class ScrambleStore {
    MainStore: MainStore;
    isLoading: boolean = false;
    scramble: string = "";
    prevScramble: string = "";
    nextScramble: string = "";
    canGetPrevScramble: boolean = false;

    constructor(mainStore: MainStore) {
        this.MainStore = mainStore;

        makeAutoObservable(this, {});
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    *scrambleGenerator() {
        this.isLoading = true;

        this.scramble = yield ScrambleService.getScramble(
            this.MainStore.selectedEvent
        );
        this.drawScramble();

        this.isLoading = false;
    }

    getNewScramble() {
        this.prevScramble = this.scramble;
        this.canGetPrevScramble = true;
        this.scrambleGenerator();
    }

    goToPrevScramble() {
        this.nextScramble = this.scramble;
        this.scramble = this.prevScramble;
        this.drawScramble();
        this.canGetPrevScramble = false;
    }

    goToNextScramble() {
        if (this.nextScramble === "") {
            this.scrambleGenerator();
        } else {
            this.scramble = this.nextScramble;
            this.drawScramble();
            this.nextScramble = "";
        }
        this.prevScramble = this.scramble;
        this.canGetPrevScramble = true;
    }

    scrambleToClipboard() {
        navigator.clipboard.writeText(this.scramble);
    }

    drawScramble() {
        const viewerElement = document.getElementById("viewer");
        if (!viewerElement) return;

        const player = new TwistyPlayer({
            puzzle: Events.find(
                (event) => event.key === this.MainStore.selectedEvent
            ).keyForViewer,
            alg: this.scramble,
            visualization: "2D",
            background: "none",
            controlPanel: "none",
        });
        viewerElement.replaceChildren(player);
    }
}
