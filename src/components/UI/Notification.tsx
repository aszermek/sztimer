import { XMarkIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react";
import * as React from "react";
import { Icon, IIconProps } from "./Icon";

export interface INotificationProps {
    icon?: IIconProps;
    type?: any;
    children: React.ReactNode;
    onDismiss?: () => void;
}

class Notification extends React.Component<INotificationProps> {
    public static defaultProps: Partial<INotificationProps> = {};

    public render() {
        const { icon, type, children, onDismiss } = this.props;

        return (
            <>
                <div className="flex justify-between items-center w-full p-3 rounded-lg bg-green-100 hover:bg-green-200 cursor-pointer">
                    <div className="flex justify-start items-center gap-3 font-bold bg-">
                        <div><Icon {...icon} /></div>
                        <div>{children}</div>
                    </div>
                    <div className="flex justify-end ml-4">
                        <Icon icon={XMarkIcon} onClick={onDismiss} />
                    </div>
                </div>
            </>
        );
    }
}

export default Notification;
