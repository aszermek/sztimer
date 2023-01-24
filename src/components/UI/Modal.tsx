import { XMarkIcon } from "@heroicons/react/24/solid";
import * as React from "react";
import { Card } from "./Card";

export interface IModalProps {
    header?: string;
    footer?: React.ReactNode;
    children: React.ReactNode;
    isOpen?: boolean;
    onDismiss?: () => void;
    size?: any;
    scrollable?: boolean;
}

class Modal extends React.Component<IModalProps> {
    public static defaultProps: Partial<IModalProps> = {};

    constructor(props: IModalProps) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.isOpen) {
            document.removeEventListener("keydown", this.handleKeyDown);
        }
    }

    componentWillUnmount(): void {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event: KeyboardEvent) => {
        if (this.props.onDismiss && event.key === "Escape") {
            this.props.onDismiss();
        }
    };

    public render() {
        const {
            header,
            footer,
            children,
            isOpen,
            onDismiss,
            size,
            scrollable,
        } = this.props;

        if (!isOpen) {
            return null;
        }

        return (
            <>
                <div className="fixed inset-0 h-screen z-10 bg-black/75" />
                <div
                    className="
					fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96
					"
                >
                    <Card>
                        <div className="flex row justify-between">
                            <div className="flex row justify-start font-bold">
                                {header}
                            </div>
                            <div className="flex row justify-end">
                                <XMarkIcon
                                    className="cursor-pointer h-6 w-6"
                                    onClick={onDismiss}
                                />
                            </div>
                        </div>
                        <div className="py-4">{children}</div>
                        <div className="flex row gap-2 justify-end">{footer}</div>
                    </Card>
                </div>
            </>
        );
    }
}

export default Modal;
