import * as React from "react";
import { ButtonColors } from "./SmallButton";

export interface IButtonProps {
    color?: ButtonColors;
    onClick?: () => void;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export class Button extends React.Component<IButtonProps> {
    public static defaultProps: Partial<IButtonProps> = {
        color: 'white'
    };

    render() {
        const { color, onClick, icon, children } = this.props;

        return (
            <div
                className={`
                    flex justify-center items-center w-fit h-10 px-4 py-2 rounded-xl text-lg cursor-pointer
                    ${color === "white" && `bg-white text-black`}
                    ${color === "red" && `bg-red-600 text-white`}
                    ${color === "green" && `bg-green-600 text-white`}
                `}
                onClick={onClick}
            >
                {children}
                {icon}
            </div>
        );
    }
}
