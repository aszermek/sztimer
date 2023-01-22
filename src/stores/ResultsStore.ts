import { flow, makeAutoObservable } from "mobx";
import { IPenaltyTypes, IResult } from "../models/IResult";
import ScrambleService from "../services/ScrambleService";

export class ResultsStore {
    _results: IResult[] = [];
    scramble: string = "";
    prevScramble: string = "";
    nextScramble: string = "";
    canGetPrevScramble: boolean = false;
    selectedEvent: string = "333";

    constructor() {
        makeAutoObservable(this, {
            generateScramble: flow,
        });
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    addResult = (result: IResult) => {
        this._results.push(result);

        this.prevScramble = this.scramble;
        this.canGetPrevScramble = true;
        this.generateScramble(this.selectedEvent);
    };

    addPenalty = (result: IResult, penalty: IPenaltyTypes) => {
        if (result.penalty !== "+2" && penalty === "+2") {
            result.time += 2;
        }
        if (result.penalty === "+2" && penalty !== "+2") {
            result.time -= 2;
        }
        result.penalty = penalty;
    };

    addComment = (result: IResult, comment: string) => {
        result.comment = comment;
    };

    removeResult = (result: IResult) => {
        this._results.splice(this._results.indexOf(result));
    };

    calculateAvg = (array: IResult[]): number | string => {
        const dnfResults: IResult[] = array.filter((r) => r.penalty === "dnf");
        if (dnfResults.length > 1) {
            return "DNF";
        }
        let worst: number;
        if (dnfResults.length > 0) {
            worst = dnfResults[0].time;
        } else {
            worst = Math.max(...array.map((r) => r.time));
        }
        let best: number;
        if (dnfResults.length > 0) {
            best = Math.min(
                ...array.filter((r) => r.penalty !== "dnf").map((r) => r.time)
            );
        } else {
            best = Math.min(...array.map((r) => r.time));
        }
        const avg: number =
            (array.reduce((a, b) => a + b.time, 0) - (best + worst)) /
            (array.length - 2);
        return avg;
    };

    *generateScramble(event: string) {
        this.scramble = yield ScrambleService.getScramble(event);
    }

    getPrevScramble() {
        this.nextScramble = this.scramble;
        this.scramble = this.prevScramble;
        this.canGetPrevScramble = false;
    }

    getNextScramble() {
        if (this.nextScramble === "") {
            this.generateScramble(this.selectedEvent);
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
}
