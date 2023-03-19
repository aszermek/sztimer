import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { inject, observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import { TimerStore } from "../../stores/TimerStore";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import { TimeFormatter } from "../utils/TimeFormatter";

export interface IManualTimerProps {
    TimerStore?: TimerStore;
}

class ManualTimer extends React.Component<IManualTimerProps> {
    onSubmit = (value: string | number) => {
        this.props.TimerStore.onSubmitManualTime(value);
    };

    render() {
        const TimerStore = this.props.TimerStore;

        return (
            <>
                <Modal
                    header="Manual timer info"
                    footer={
                        <Button
                            color="green"
                            onClick={() =>
                                TimerStore.update(
                                    "isOpenManualInfoModal",
                                    false
                                )
                            }
                        >
                            Close
                        </Button>
                    }
                    isOpen={TimerStore.isOpenManualInfoModal}
                    onDismiss={() =>
                        TimerStore.update("isOpenManualInfoModal", false)
                    }
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            Manually entered times can be entered in many
                            formats.
                        </div>

                        <div className="flex flex-col gap-2">
                            Seconds and milliseconds should be separated by dot
                            or comma. If only numbers are entered, the last 2 digits
                            will automatically be parsed as milliseconds.
                            <br />
                            <div className="font-bold">
                                {`1234 or 12.34 or 12,34 => 12.34`}
                                <br />
                                {`98 => 0.98`}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            After minutes and hours, you should use colon. For
                            example:
                            <br />
                            <div className="font-bold">
                                {`1:23:45.67 => 1 hour, 23 minutes, 45 seconds and 67 milliseconds`}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            If a value higher than 59 is provided for seconds,
                            it will automatically be parsed as minutes.
                            <br />
                            <div className="font-bold">{`98.76 => 1:38.76`}</div>
                        </div>

                        <div className="flex flex-col gap-2">
                            You can also enter penalties in the manual timer.
                            The accepted formats are:
                            <br />
                            <div className="font-bold">
                                {`dnf(xx.xx) or DNF(xx.xx) => DNF penalty`}
                                <br />
                                {`xx.xx+ => +2 penalty`}
                            </div>
                        </div>
                    </div>
                </Modal>
                <Input
                    isTimer
                    onSubmit={this.onSubmit}
                    error={
                        TimerStore.manualTimeError && {
                            label: TimerStore.manualTimeError,
                            icon: {
                                icon: InformationCircleIcon,
                                onClick: () =>
                                    TimerStore.update(
                                        "isOpenManualInfoModal",
                                        true
                                    ),
                            },
                        }
                    }
                />
            </>
        );
    }
}

export default inject('TimerStore')(observer(ManualTimer));
