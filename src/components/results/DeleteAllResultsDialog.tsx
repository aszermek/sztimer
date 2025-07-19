import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAtom, useAtomValue } from "jotai";
import * as React from "react";
import {
    deleteAllResultsFromSessionAtom,
    filteredResultsAtom,
} from "../../atoms/resultAtoms";
import { Button } from "../ui/button";

interface DeleteAllResultsDialogProps
    extends Partial<React.ComponentProps<typeof Dialog>> {
    onClose?: () => void;
}

export const DeleteAllResultsDialog: React.FC<DeleteAllResultsDialogProps> = ({
    onClose,
    ...props
}) => {
    const filteredResults = useAtomValue(filteredResultsAtom);
    const [, deleteAllResults] = useAtom(deleteAllResultsFromSessionAtom);

    const results = [...filteredResults].reverse();

    if (!results) {
        return null;
    }

    const handleDelete = () => {
        deleteAllResults();
        onClose?.();
    };

    return (
        <Dialog {...props}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm delete</DialogTitle>
                </DialogHeader>
                <span>
                    Are you sure you want to delete all results from the current
                    session?
                </span>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
