import {
    ChatBubbleBottomCenterTextIcon,
    CheckIcon,
    PaperAirplaneIcon, TrashIcon, XMarkIcon
} from "@heroicons/react/20/solid";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IResult } from "../../models/IResult";
import { ResultsStore } from "../../stores/ResultsStore";
import { Button } from "../UI/Button";
import Input from "../UI/Input";

export interface IResultFlaggerProps {
    ResultsStore?: ResultsStore;
    result: IResult;
}

class ResultFlagger extends React.Component<IResultFlaggerProps> {
    render() {
        const { ResultsStore, result } = this.props;

        if (!result) return null;

        if (ResultsStore.isOpenCommentInput)
            return (
                <div className="flex gap-2">
                    <Input
                        label={result.comment ? "Edit comment" : "Add comment"}
                        icon={{ icon: XMarkIcon, onClick: () => ResultsStore.update("isOpenCommentInput", false) }}
                        forceFocus
                        onSubmit={(comment) =>
                            ResultsStore.addComment(result, comment.toString())
                        }
                        value={result.comment && result.comment}
                    />
                    {/* <Button
                        regular
                        // color="white"
                        icon={{ icon: XMarkIcon }}
                        onClick={() =>
                            ResultsStore.update("isOpenCommentInput", false)
                        }
                    /> */}
                </div>
            );

        return (
            <div className="flex flex-row gap-3">
                <Button
                    regular
                    onClick={() =>
                        ResultsStore.update("isOpenCommentInput", true)
                    }
                    icon={{ icon: ChatBubbleBottomCenterTextIcon }}
                />
                <Button
                    regular
                    onClick={() => ResultsStore.addPenalty(result, null)}
                    icon={{ icon: CheckIcon }}
                />
                <Button
                    regular
                    onClick={() => ResultsStore.addPenalty(result, "+2")}
                >
                    +2
                </Button>
                <Button
                    regular
                    onClick={() => ResultsStore.addPenalty(result, "dnf")}
                >
                    DNF
                </Button>
                <Button
                    regular
                    onClick={() => ResultsStore.removeResult(result)}
                    icon={{ icon: TrashIcon }}
                />
            </div>
        );
    }
}

export default inject("ResultsStore")(observer(ResultFlagger));
