import * as React from "react";
import { ButtonColors } from "./SmallButton";

export interface IButtonProps {
    color?: ButtonColors;
    onClick?: () => void;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export class Button extends React.Component<IButtonProps> {
    render() {
        const { color, onClick, icon, children } = this.props;

        return (
            <div
                className={`flex justify-center items-center gap-2 w-fit h-10 px-5 py-2 rounded-3xl text-lg cursor-pointer ${
                    color === "Red"
                        ? `bg-red-600 text-white`
                        : `bg-white text-black`
                }`}
                onClick={onClick}
            >
                {children}
                {icon}
            </div>
        );
    }
}
