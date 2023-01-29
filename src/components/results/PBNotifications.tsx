import { observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import { ResultsStore } from "../../stores/ResultsStore";
import { Button } from "../UI/Button";
import Modal from "../UI/Modal";
import { TimeFormatter } from "../utils/TimeFormatter";

export interface IPBNotificationsProps {
    MainStore?: MainStore;
    ResultsStore?: ResultsStore;
}

class PBNotifications extends React.Component<IPBNotificationsProps> {
    render() {
        const ResultsStore = this.props.ResultsStore;
        const results = ResultsStore.filteredResults;

        return (
            <></>
        );
    }
}

export default observer(PBNotifications);
