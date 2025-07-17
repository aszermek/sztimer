import { WrenchIcon } from "@phosphor-icons/react";
import { DuotoneHoverIcon } from "../common/DuotoneHoverIcon";
import { Button } from "../ui/button";

export const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-center bg-[#ddff77] border-b border-b-border px-4 py-2">
            <div className="flex items-center justify-between gap-8 w-full max-w-[1872px]">
                <div className="font-logo text-5xl text-black">szTimer</div>
                <Button
                    variant="link"
                    size="icon"
                    onClick={() => {}}
                    className="hover"
                >
                    <DuotoneHoverIcon icon={WrenchIcon} className="size-8" />
                </Button>
            </div>
        </header>
    );
};
