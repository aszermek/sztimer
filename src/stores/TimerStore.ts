import { makeAutoObservable, runInAction } from "mobx";
import { PenaltyTypes, IResult } from "../models/IResult";
import MainStore from "./MainStore";

export class TimerStore {
    MainStore: MainStore;
    withInspection: boolean = true;
    isManualEnter: boolean = false;
    isRunningTimer: boolean = false;
    isRunningInspection: boolean = false;
    isSpacebarPressed: boolean = false;
    justStopped: boolean = false;
    canRestart: boolean = true;
    elapsedTime: number = 0;
    inspectionTime: number = 15;
    timerIntervalId: number | undefined;
    inspectionIntervalId: number | undefined;
    cachedInspectionPenalty: PenaltyTypes = null;
    manualTimeError: string | undefined;
    isOpenManualInfoModal: boolean = false;

    constructor(mainStore: MainStore) {
        this.MainStore = mainStore;

        makeAutoObservable(this, {});
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    handleKeyUp = (event: KeyboardEvent) => {
        if (!this.MainStore.isOpenAnyModal) {
            this.update("isSpacebarPressed", false);
            if (event.key === " ") {
                if (
                    !this.justStopped &&
                    !this.isRunningTimer &&
                    this.canRestart
                ) {
                    if (this.withInspection && !this.isRunningInspection) {
                        this.startCountdown();
                    } else {
                        this.startTimer();
                    }
                } else {
                    this.update("justStopped", false);
                }
            }
        }
    };

    handleKeyDown = (event: KeyboardEvent) => {
        if (!this.MainStore.isOpenAnyModal) {
            this.update("isSpacebarPressed", true);
            if (this.isRunningTimer) {
                this.stopTimer();
                if (event.key === " ") {
                    this.update("justStopped", true);
                }
                if (event.key === "Escape") {
                    const results = this.MainStore.ResultsStore.filteredResults;
                    const latestResult = results[results.length - 1];
                    this.MainStore.ResultsStore.addPenalty(latestResult, "dnf");
                }
            }
        }
    };

    startTimer = () => {
        clearInterval(this.inspectionIntervalId);
        this.isRunningInspection = false;
        this.inspectionTime = 15;

        this.isRunningTimer = true;
        this.elapsedTime = 0;
        this.timerIntervalId = window.setInterval(() => {
            runInAction(() => {
                this.elapsedTime += 0.01;
            });
        }, 10);
    };

    startCountdown = () => {
        this.isRunningInspection = true;
        this.inspectionIntervalId = window.setInterval(() => {
            runInAction(() => {
                this.inspectionTime -= 1;
            });
            if (this.inspectionTime < 1) {
                this.inspectionPenaltyHandler(this.inspectionTime);
            }
        }, 1000);
    };

    inspectionPenaltyHandler = (usedInspection: number) => {
        if (usedInspection < -1) {
            this.cachedInspectionPenalty = "dnf";
        } else if (usedInspection < 1 && usedInspection >= -1) {
            this.cachedInspectionPenalty = "+2";
        }
    };

    stopTimer = () => {
        clearInterval(this.timerIntervalId);
        this.isRunningTimer = false;
        this.canRestart = false;
        setTimeout(() => {
            this.canRestart = true;
        }, 200);

        this.MainStore.ResultsStore.addResult({
            time: this.elapsedTime,
            scramble: this.MainStore.ScrambleStore.scramble,
            date: new Date(),
            event: this.MainStore.selectedEvent,
            session: this.MainStore.selectedSession,
        } as IResult);

        const results = this.MainStore.ResultsStore.filteredResults;
        const latestResult = results[results.length - 1];
        if (this.cachedInspectionPenalty) {
            this.MainStore.ResultsStore.addPenalty(
                latestResult,
                this.cachedInspectionPenalty
            );
        }

        this.cachedInspectionPenalty = null;
    };

    parseTime = (enteredTime: string): number | undefined => {
        const regex = new RegExp(/^(\d*[:]?)(\d*[:]?)(\d*[,.]?)(\d*$)/);
        if (!regex.test(enteredTime)) return;

        if (enteredTime.includes(".") || enteredTime.includes(",")) {
            // Add the value directly
            return parseFloat(enteredTime);
        } else {
            // Add the last two digits as decimal places
            return parseFloat(
                enteredTime.slice(0, -2) + "." + enteredTime.slice(-2)
            );
        }
    };

    onSubmitManualTime = (value: string | number) => {
        const resultData = {
            scramble: this.MainStore.ScrambleStore.scramble,
            date: new Date(),
            event: this.MainStore.selectedEvent,
            session: this.MainStore.selectedSession,
        };

        const valueAsString = value as string;

        const isDnfFormat =
            valueAsString.toLowerCase().startsWith("dnf(") &&
            valueAsString.endsWith(")");
        const isPlusTwoFormat = valueAsString.endsWith("+");

        const error = "Invalid format";

        let penalty = null;
        let time = valueAsString;

        if (isDnfFormat) {
            time = time.slice(4, -1);
            penalty = "dnf";
        } else if (isPlusTwoFormat) {
            time = time.slice(0, -1);
            penalty = "+2";
        }

        const parsedTime = this.parseTime(time);

        if (!parsedTime) {
            this.manualTimeError = error;
        } else {
            this.MainStore.ResultsStore.addResult({
                ...resultData,
                time: parsedTime,
                penalty: penalty as PenaltyTypes,
            });
            this.manualTimeError = undefined;
        }
    };
}
