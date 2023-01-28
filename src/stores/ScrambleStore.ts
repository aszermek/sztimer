import { TwistyPlayer } from "cubing/twisty";
import { makeAutoObservable } from "mobx";
import ScrambleService from "../services/ScrambleService";
import MainStore from "./MainStore";

export class ScrambleStore {
    MainStore: MainStore;
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
        this.scramble = yield ScrambleService.getScramble(this.MainStore.selectedEvent);
        this.drawScramble();
    }

    getNewScramble() {
        this.prevScramble = this.scramble;
        this.canGetPrevScramble = true;
        this.scrambleGenerator();
    }

    goToPrevScramble() {
        this.nextScramble = this.scramble;
        this.scramble = this.prevScramble;
        this.canGetPrevScramble = false;
    }

    goToNextScramble() {
        if (this.nextScramble === "") {
            this.scrambleGenerator();
        } else {
            this.scramble = this.nextScramble;
            this.nextScramble = "";
        }
        this.prevScramble = this.scramble;
        this.canGetPrevScramble = true;
    }

    scrambleToClipboard() {
        navigator.clipboard.writeText(this.scramble);
    }

    drawScramble() {
        const player = new TwistyPlayer({
            puzzle: "3x3x3",
            alg: this.scramble,
            visualization: "2D",
            background: "none",
            controlPanel: "none",
        });
        document.getElementById("viewer").replaceChildren(player);
    }
}
