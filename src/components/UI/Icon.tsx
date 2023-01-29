import React, { HTMLAttributes } from "react";

export type IconSize = 6 | 8 | 12 | 16 | 20 | 24 | 28 | 48 | 72 | 96;

export interface IIconProps extends HTMLAttributes<HTMLDivElement> {
    icon: React.ElementType | ((p: any) => JSX.Element);
    size?: IconSize;
}

export class Icon extends React.Component<IIconProps> {
    public static defaultProps: Partial<IIconProps> = {
        size: 24,
    };

    public render() {
        const { icon, size } = this.props;

        if (!icon) {
            console.error("Icon is not defined", this.props);

            return null;
        }

        const IconComponent = icon as React.ElementType;

        return <div className="w-5 h-5">{<IconComponent />}</div>;
    }
}
