import { observer } from "mobx-react";
import * as React from "react";
import { IResult } from "../../models/IResult";
import MainStore from "../../stores/MainStore";
import { ResultsStore } from "../../stores/ResultsStore";
import { Button } from "../UI/Button";
import Modal from "../UI/Modal";
import { TimeFormatter } from "../utils/TimeFormatter";
import DetailedResultsModal from "./DetailedResultsModal";

export interface IResultsProps {
    MainStore?: MainStore;
    ResultsStore?: ResultsStore;
}

class Results extends React.Component<IResultsProps> {
    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    render() {
        const ResultsStore = this.props.ResultsStore;
        const results = ResultsStore._results;

        if (!results) {
            return null;
        }

        let solveCount: number = results.length;
        let validSolveCount: number = results.filter(
            (r) => r.penalty != "dnf"
        ).length;
        let mean: number =
            validSolveCount &&
            results
                .filter((r) => r.penalty != "dnf")
                .reduce((a, b) => {
                    return a + b.time;
                }, 0) / validSolveCount;

        return (
            <>
                <Modal
                    header="Confirm delete"
                    footer={
                        <Button
                            color="red"
                            onClick={ResultsStore.deleteAllResults}
                        >
                            Delete
                        </Button>
                    }
                    isOpen={ResultsStore.isOpenDeleteModal}
                    onDismiss={() =>
                        ResultsStore.update("isOpenDeleteModal", false)
                    }
                >
                    Are you sure you want to delete all results from current
                    session?
                </Modal>
                <DetailedResultsModal ResultsStore={ResultsStore} />
                <table className="table-auto m-auto">
                    <thead>
                        <tr>
                            <th colSpan={4} className="p-3">
                                <div className="flex flex-row gap-4">
                                    <div className="flex justify-center items-center">
                                        {"Solves: "}
                                        {validSolveCount}/{solveCount}
                                        <br />
                                        {"Mean: "}
                                        <TimeFormatter time={mean} />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Button
                                            color="red"
                                            onClick={() =>
                                                ResultsStore.update(
                                                    "isOpenDeleteModal",
                                                    true
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>time</th>
                            <th>ao5</th>
                            <th>ao12</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(() => {
                            const rows = [];
                            for (let i = results.length - 1; i >= 0; i--) {
                                const result = results[i];
                                let currentFive: IResult[] = results.slice(
                                    Math.max(0, i - 4),
                                    i + 1
                                );
                                let currentTwelve: IResult[] = results.slice(
                                    Math.max(0, i - 11),
                                    i + 1
                                );
                                let avgFive: number | string | null =
                                    currentFive.length >= 5
                                        ? ResultsStore.calculateAvg(currentFive)
                                        : null;
                                let avgTwelve: number | string | null =
                                    currentTwelve.length >= 12
                                        ? ResultsStore.calculateAvg(
                                              currentTwelve
                                          )
                                        : null;
                                rows.push(
                                    <tr key={i}>
                                        <td className="p-2 text-right">
                                            {i + 1}
                                        </td>
                                        <td
                                            className="p-2 text-center cursor-pointer"
                                            onClick={() =>
                                                ResultsStore.openDetails([
                                                    result
                                                ])
                                            }
                                        >
                                            <TimeFormatter
                                                time={result.time}
                                                penalty={result.penalty}
                                            />
                                        </td>
                                        <td
                                            className="p-2 text-center cursor-pointer"
                                            onClick={() =>
                                                ResultsStore.openDetails(
                                                    currentFive
                                                )
                                            }
                                        >
                                            <TimeFormatter time={avgFive} />
                                        </td>
                                        <td
                                            className="p-2 text-center cursor-pointer"
                                            onClick={() =>
                                                ResultsStore.openDetails(
                                                    currentTwelve
                                                )
                                            }
                                        >
                                            <TimeFormatter time={avgTwelve} />
                                        </td>
                                    </tr>
                                );
                            }
                            return rows;
                        })()}
                    </tbody>
                </table>
            </>
        );
    }
}

export default observer(Results);
