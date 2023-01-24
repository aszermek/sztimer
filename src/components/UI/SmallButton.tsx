import * as React from "react";

export type ButtonColors = "white" | "red" | "green";

export interface ISmallButtonProps {
    color?: ButtonColors;
    onClick?: () => void;
    children: React.ReactNode;
}

export class SmallButton extends React.Component<ISmallButtonProps> {
    public static defaultProps: Partial<ISmallButtonProps> = {
        color: 'white'
    };
    
    render() {
        const { color, onClick, children } = this.props;

        return (
            <div
                className={`
                    flex justify-center items-center w-10 h-10 p-2 rounded-xl text-lg cursor-pointer
                    ${color === "white" && `bg-white text-black`}
                    ${color === "red" && `bg-red-600 text-white`}
                    ${color === "green" && `bg-green-600 text-white`}
                `}
                onClick={onClick}
            >
                {children}
            </div>
        );
    }
}
