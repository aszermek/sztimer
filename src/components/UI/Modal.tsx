import { XMarkIcon } from "@heroicons/react/24/solid";
import { makeObservable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import { Card } from "./Card";

export interface IModalProps {
    MainStore?: MainStore;
    header?: string;
    footer?: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    onDismiss?: () => void;
    size?: number;
    scrollable?: boolean;
}

class Modal extends React.Component<IModalProps> {
    MainStore: MainStore;
    public static defaultProps: Partial<IModalProps> = {
        // size: 6
    };

    constructor(props: IModalProps) {
        super(props);

        this.MainStore = new MainStore();
    }

    componentDidMount(): void {
        if (this.props.isOpen) {
            document.addEventListener("keydown", this.handleKeyDown);
        }
    }

    componentWillUnmount(): void {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    // componentDidUpdate(prevProps: Readonly<IModalProps>, prevState: Readonly<{}>, snapshot?: any): void {
    //     this.MainStore.update("isOpenAnyModal", !prevProps.isOpen);
    //     console.log(this.MainStore.isOpenAnyModal, "cdu")
    // }

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

        let sizeClassNames = ["w-1/12", "w-2/12", "w-3/12", "w-4/12", "w-5/12", "w-6/12", "w-7/12", "w-8/12", "w-9/12", "w-10/12", "w-11/12", "w-full"];
        let sizeClassName = sizeClassNames[size - 1];

        return (
            <>
                <div className="fixed inset-0 h-screen z-10 bg-black/75" />
                <div
                    className={`
					fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClassName}
					`}
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
                        <div className="flex row gap-2 justify-end">
                            {footer}
                        </div>
                    </Card>
                </div>
            </>
        );
    }
}

export default observer(Modal);
