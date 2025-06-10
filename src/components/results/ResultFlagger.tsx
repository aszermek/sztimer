import {
    ChatCenteredTextIcon,
    CheckIcon,
    TrashIcon,
} from "@phosphor-icons/react";
import { useAtom } from "jotai";
import * as React from "react";
import {
    addCommentAtom,
    addPenaltyAtom,
    isOpenCommentInputAtom,
    removeResultAtom,
} from "../../atoms/resultAtoms";
import type { Result } from "../../types/results";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export interface IResultFlaggerProps {
    result: Result;
}

const ResultFlagger: React.FC<IResultFlaggerProps> = ({ result }) => {
    const [isOpenCommentInput, setIsOpenCommentInput] = useAtom(
        isOpenCommentInputAtom
    );
    const [, addPenalty] = useAtom(addPenaltyAtom);
    const [, addComment] = useAtom(addCommentAtom);
    const [, removeResult] = useAtom(removeResultAtom);

    const handleCommentToggle = () => {
        setIsOpenCommentInput(!isOpenCommentInput);
    };

    const handleCommentSubmit = (comment: string) => {
        addComment({ result, comment });
    };

    const handlePenaltyChange = (penalty: "dnf" | "+2" | null) => {
        addPenalty({ result, penalty });
    };

    const handleRemoveResult = () => {
        removeResult(result);
    };

    if (!result) return null;

    if (isOpenCommentInput) {
        return (
            <div className="flex gap-2">
                <Input
                    // label={result.comment ? "Edit comment" : "Add comment"}
                    // icon={{
                    //     icon: XMarkIcon,
                    //     onClick: handleCommentToggle
                    // }}
                    // forceFocus
                    // onSubmit={handleCommentSubmit}
                    value={result.comment || ""}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-row gap-3">
            <Button size="icon" onClick={handleCommentToggle}>
                <ChatCenteredTextIcon size={16} />
            </Button>
            <Button size="icon" onClick={() => handlePenaltyChange(null)}>
                <CheckIcon size={16} />
            </Button>
            <Button size="icon" onClick={() => handlePenaltyChange("+2")}>
                +2
            </Button>
            <Button size="icon" onClick={() => handlePenaltyChange("dnf")}>
                DNF
            </Button>
            <Button size="icon" onClick={handleRemoveResult}>
                <TrashIcon size={16} />
            </Button>
        </div>
    );
};

export default ResultFlagger;
