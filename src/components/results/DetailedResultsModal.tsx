import { inject, observer } from "mobx-react";
import * as React from "react";
import { IResult } from "../../models/IResult";
import MainStore from "../../stores/MainStore";
import { ResultsStore } from "../../stores/ResultsStore";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { TimeFormatter } from "../utils/TimeFormatter";
import ResultFlagger from "./ResultFlagger";

export interface IDetailedResultsModalProps {
    MainStore?: MainStore;
    ResultsStore?: ResultsStore;
}

class DetailedResultsModal extends React.Component<IDetailedResultsModalProps> {
    render() {
        const ResultsStore = this.props.ResultsStore;
        const results = ResultsStore.openResults;
        const stats = ResultsStore.StatisticsStore;

        if (!results.length) return null;

        const dnfResults: IResult[] = results.filter(
            (r) => r.penalty === "dnf"
        );
        let worst: number;
        if (dnfResults.length > 0) {
            worst = dnfResults[0].time;
        } else {
            worst = Math.max(...results.map((r) => r.time));
        }
        let best: number;
        if (dnfResults.length > 0) {
            best = Math.min(
                ...results.filter((r) => r.penalty !== "dnf").map((r) => r.time)
            );
        } else {
            best = Math.min(...results.map((r) => r.time));
        }

        return (
            <Modal
                header="Result details"
                footer={
                    <div className="flex w-full justify-between">
                        {results.length === 1 && (
                            <div className="flex">
                                <ResultFlagger result={results[0]} />
                            </div>
                        )}
                        <div className="flex gap-4 w-full justify-end">
                            <Button
                                color="green"
                                type={
                                    ResultsStore.isCopiedDetails
                                        ? "secondary"
                                        : "primary"
                                }
                                onClick={ResultsStore.copyDetails}
                            >
                                {ResultsStore.isCopiedDetails
                                    ? "Copied to clipboard!"
                                    : "Copy to clipboard"}
                            </Button>
                            <Button
                                color="red"
                                onClick={ResultsStore.closeDetails}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                }
                size={8}
                onDismiss={ResultsStore.closeDetails}
                isOpen={ResultsStore.isOpenResultModal}
            >
                <div
                    className="flex flex-col gap-1"
                    ref={(detailsRef) => (ResultsStore.detailsRef = detailsRef)}
                >
                    {results.length === stats.results.length ? (
                        <div className="flex flex-col gap-1 mb-2">
                            <div>
                                {"Solves: "}
                                {stats.validSolveCount}/{stats.solveCount}
                            </div>
                            <div>
                                {"Mean: "}
                                {TimeFormatter({ time: stats.mean })}
                            </div>
                            <div>
                                {"Best single: "}
                                {TimeFormatter({ time: stats.bestSingle })}
                            </div>
                            <div>
                                {"Worst single: "}
                                {TimeFormatter({ time: stats.worstSingle })}
                            </div>
                            <div>
                                {"Best average of 5: "}
                                {TimeFormatter({ time: stats.bestAo5 })}
                            </div>
                        </div>
                    ) : (
                        results.length > 1 && (
                            <div className="mb-2">
                                Average of {results.length}:{" "}
                                {TimeFormatter({
                                    time: ResultsStore.calculateAvg(results),
                                })}
                            </div>
                        )
                    )}
                    {results
                        .slice()
                        .reverse()
                        .map((result, i) => (
                            <div key={i}>
                                {results.length > 1 && i + 1 + ". "}
                                {results.length > 1 &&
                                (result.time === best ||
                                    result.time === worst) ? (
                                    <>
                                        (
                                        {TimeFormatter({
                                            time: result.time,
                                            penalty: result.penalty,
                                            displayTimeOnDnf: true,
                                        })}
                                        )
                                    </>
                                ) : (
                                    TimeFormatter({
                                        time: result.time,
                                        penalty: result.penalty,
                                        displayTimeOnDnf: true,
                                    })
                                )}
                                {" - "}
                                {result.scramble}
                                {" - "}@{result.date.toLocaleString()}{" "}
                                {result.comment && `(${result.comment})`}
                            </div>
                        ))}
                </div>
            </Modal>
        );
    }
}

export default inject("ResultsStore")(observer(DetailedResultsModal));
