import {
    isRunningInspectionAtom,
    isRunningTimerAtom,
} from "@/atoms/timerAtoms";
import {
    HourglassHighIcon,
    HourglassIcon,
    HourglassLowIcon,
    HourglassMediumIcon,
    WrenchIcon,
} from "@phosphor-icons/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { EventCombobox } from "../event/EventCombobox";
import { Settings } from "../settings/Settings";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

export const Header: React.FC = () => {
    const [isOpenSettingsDialog, setIsOpenSettingsDialog] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isInspecting = useAtomValue(isRunningInspectionAtom);
    const isRunning = useAtomValue(isRunningTimerAtom);

    const IconComponent = isHovered
        ? HourglassIcon
        : isInspecting
        ? HourglassHighIcon
        : isRunning
        ? HourglassMediumIcon
        : HourglassLowIcon;

    return (
        <>
            <header className="flex items-center justify-center bg-[#ddff77] border-b border-b-border px-4 py-3 md:py-1">
                <div className="flex items-center justify-between gap-8 w-full max-w-[1872px]">
                    <div
                        className="flex items-end gap-4 font-logo text-6xl cursor-pointer select-none"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <IconComponent
                            weight="fill"
                            size={30}
                            className="md:mb-[13px]"
                        />
                        <span className="hidden md:block mb-1 text-black">
                            szTimer
                        </span>
                    </div>
                    <WrenchIcon
                        weight="fill"
                        size={32}
                        className="hidden lg:flex cursor-pointer"
                        onClick={() => setIsOpenSettingsDialog(true)}
                    />
                    <div className="flex lg:hidden min-w-48 w-1/4">
                        <EventCombobox />
                    </div>
                </div>
            </header>

            <Dialog
                open={isOpenSettingsDialog}
                onOpenChange={setIsOpenSettingsDialog}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                    </DialogHeader>
                    <Settings />
                    <DialogFooter>
                        <Button
                            variant="default"
                            onClick={() => setIsOpenSettingsDialog(false)}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
