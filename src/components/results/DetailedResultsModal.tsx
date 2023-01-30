import { observer } from "mobx-react";
import * as React from "react";
import { IResult } from "../../models/IResult";
import MainStore from "../../stores/MainStore";
import { ResultsStore } from "../../stores/ResultsStore";
import { Button } from "../UI/Button";
import Modal from "../UI/Modal";
import { TimeFormatter } from "../utils/TimeFormatter";

export interface IDetailedResultsModalProps {
    MainStore?: MainStore;
    ResultsStore?: ResultsStore;
}

class DetailedResultsModal extends React.Component<IDetailedResultsModalProps> {
    render() {
        const ResultsStore = this.props.ResultsStore;
        const results = ResultsStore.openResults;

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
                    <Button
                        color="green"
                        onClick={() =>
                            ResultsStore.update("isOpenResultModal", false)
                        }
                    >
                        Close
                    </Button>
                }
                size={8}
                onDismiss={() =>
                    ResultsStore.update("isOpenResultModal", false)
                }
                isOpen={ResultsStore.isOpenResultModal}
            >
                <>
                    {results.map((result, index) => (
                        <div key={index}>
                            {result.time === best || result.time === worst ? (
                                <>
                                    (<TimeFormatter time={result.time} penalty={result.penalty} displayTimeOnDnf />)
                                </>
                            ) : (
                                <TimeFormatter time={result.time} penalty={result.penalty} displayTimeOnDnf />
                            )}{" "}
                            ({result.date.toLocaleString()}){" - "}
                            {result.scramble}
                        </div>
                    ))}
                </>
            </Modal>
        );
    }
}

export default observer(DetailedResultsModal);
