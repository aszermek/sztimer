import React, { HTMLAttributes } from "react";

export type IconSize = "xs" | "sm" | "md" | "lg";

export interface IIconProps extends HTMLAttributes<HTMLDivElement> {
    icon: React.ElementType | ((p: any) => JSX.Element);
    size?: IconSize;
    onClick?: () => void;
}

export class Icon extends React.Component<IIconProps> {
    public static defaultProps: Partial<IIconProps> = {
        size: "md",
    };

    public render() {
        const { icon, size, onClick } = this.props;

        if (!icon) {
            console.error("Icon is not defined", this.props);

            return null;
        }

        let className: string = "";
        switch (size) {
            case "xs":
                className = "w-3 h-3";
                break;
            case "sm":
                className = "w-4 h-4";
                break;
            case "md":
                className = "w-5 h-5";
                break;
            case "lg":
                className = "w-6 h-6";
                break;
        }

        const IconComponent = icon as React.ElementType;

        return (
            <div
                className={`${className} ${onClick && "cursor-pointer"}`}
                onClick={onClick}
            >
                {<IconComponent />}
            </div>
        );
    }
}
