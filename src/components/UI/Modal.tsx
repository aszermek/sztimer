import { XMarkIcon } from "@heroicons/react/24/solid";
import * as React from "react";
import { useEffect } from "react";
import Card from "./Card";

export interface IModalProps {
    header?: string;
    footer?: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    onDismiss?: () => void;
    size?: number;
    scrollable?: boolean;
}

const Modal = ({
    header,
    footer,
    children,
    isOpen,
    onDismiss,
    size,
    scrollable = true,
}: IModalProps) => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (onDismiss && event.key === "Escape") {
            onDismiss();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const sizeClassNames = [
        "w-1/12",
        "w-2/12",
        "w-3/12",
        "w-4/12",
        "w-5/12",
        "w-6/12",
        "w-7/12",
        "w-8/12",
        "w-9/12",
        "w-10/12",
        "w-11/12",
        "w-full",
    ];
    const sizeClassName = sizeClassNames[size - 1];

    return (
        <>
            <div className="fixed inset-0 h-screen z-30 bg-black/75" />
            <div
                className={`
					fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClassName}
					`}
            >
                <Card>
                    <div className="flex row justify-between">
                        <div className="flex row justify-start font-bold">
                            {header}
                        </div>
                        <div className="flex row justify-end -m-1 p-1 rounded-lg hover:bg-slate-100">
                            <XMarkIcon
                                className="cursor-pointer h-6 w-6"
                                onClick={onDismiss}
                            />
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="max-h-[60vh] overflow-auto">
                            {children}
                        </div>
                    </div>
                    <div className="flex justify-end">{footer}</div>
                </Card>
            </div>
        </>
    );
};

export default Modal;
