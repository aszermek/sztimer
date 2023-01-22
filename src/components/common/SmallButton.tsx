import * as React from "react";

export type ButtonColors = "White" | "Red";

export interface ISmallButtonProps {
    color?: ButtonColors;
    onClick?: () => void;
    children: any;
}

export class SmallButton extends React.Component<ISmallButtonProps> {
    render() {
        const { color, onClick, children } = this.props;

        return (
            <div
                className={`flex justify-center items-center w-10 h-10 p-2 rounded-3xl text-lg cursor-pointer ${
                    color === "Red"
                        ? `bg-red-600 text-white`
                        : `bg-white text-black`
                }`}
                onClick={onClick}
            >
                {children}
            </div>
        );
    }
}
