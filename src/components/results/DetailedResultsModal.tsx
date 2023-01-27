import { observer } from "mobx-react";
import * as React from "react";
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
                    {results.map((result) => (
                        <div>
                            <TimeFormatter time={result.time} /> (
                            {result.date.toLocaleString()}){" - "}
                            {result.scramble}
                        </div>
                    ))}
                </>
            </Modal>
        );
    }
}

export default observer(DetailedResultsModal);
