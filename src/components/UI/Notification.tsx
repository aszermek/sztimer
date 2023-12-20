import { XMarkIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react";
import * as React from "react";
import { Icon, IIconProps } from "./Icon";

export interface INotificationProps {
    icon?: IIconProps;
    type?: any;
    children: React.ReactNode;
    onDismiss?: () => void;
    onClick?: () => void;
}

const Notification = ({
    icon,
    type,
    children,
    onDismiss,
    onClick,
}: INotificationProps) => {
    return (
        <>
            <div
                className="group flex justify-between items-center w-full p-3 rounded-lg bg-green-50 hover:bg-green-100 cursor-pointer"
                onClick={onClick}
            >
                <div className="flex justify-start items-center gap-3 font-bold bg-">
                    <div>
                        <Icon {...icon} />
                    </div>
                    <div>{children}</div>
                </div>
                <div className="flex justify-end ml-4 p-1 hover:bg-green-100 group-hover:bg-green-50">
                    <Icon icon={XMarkIcon} onClick={onDismiss} />
                </div>
            </div>
        </>
    );
};

export default Notification;
