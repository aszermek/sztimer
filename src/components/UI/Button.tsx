import * as React from "react";
import { Icon, IIconProps } from "./Icon";

export type ButtonColors = "white" | "red" | "green" | "grey";
export type ButtonTypes = "primary" | "secondary";

export interface IButtonProps {
    color?: ButtonColors;
    type?: ButtonTypes;
    small?: boolean;
    regular?: boolean;
    onClick?: () => void;
    icon?: IIconProps;
    children: React.ReactNode;
}

export class Button extends React.Component<IButtonProps> {
    public static defaultProps: Partial<IButtonProps> = {
        color: "grey",
        type: "primary"
    };

    render() {
        const { color, type, small, regular, onClick, icon, children } = this.props;

        return (
            <div
                className={`
                    flex justify-center items-center py-2 gap-3 rounded-xl cursor-pointer
                    ${small ? "gap-2 h-6 text-sm" : "gap-3 h-10 text-lg"}
                    ${regular ? (small ? "w-6" : "w-10") : "w-fit px-4"}
                    ${color === "white" && `bg-white text-black`}
                    ${color === "red" && (type === "primary" ? `bg-red-600 hover:bg-red-500 active:bg-red-700 text-white` : `bg-white text-red-600`)}
                    ${color === "green" && (type === "primary" ? `bg-green-600 hover:bg-green-500 active:bg-green-700 text-white` : `bg-white text-green-600`)}
                    ${color === "grey" && `bg-slate-200/50 text-black shadow-emboss active:shadow-embossHover`}
                `}
                onClick={onClick}
            >
                    {children}
                    {icon && <Icon size={small ? "sm" : "md"} {...icon} />}
            </div>
        );
    }
}
