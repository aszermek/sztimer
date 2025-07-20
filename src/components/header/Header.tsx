import { HourglassIcon, WrenchIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { DuotoneHoverIcon } from "../common/DuotoneHoverIcon";
import { EventCombobox } from "../event/EventCombobox";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Settings } from "../settings/Settings";

export const Header: React.FC = () => {
    const [isOpenSettingsDialog, setIsOpenSettingsDialog] =
        useState<boolean>(false);

    return (
        <>
            <header className="flex items-center justify-center bg-[#ddff77] border-b border-b-border px-4 py-1">
                <div className="flex items-center justify-between gap-8 w-full max-w-[1872px]">
                    <div className="flex items-center gap-4 font-logo text-6xl">
                        <HourglassIcon
                            weight="fill"
                            size={40}
                            className="drop-shadow-black"
                        />
                        <span className="hidden md:block mb-1 text-black">
                            szTimer
                        </span>
                    </div>
                    <DuotoneHoverIcon
                        icon={WrenchIcon}
                        size={32}
                        className="hidden lg:flex"
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
                        <Button variant="default" onClick={() => {}}>
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
