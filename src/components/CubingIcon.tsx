import React from "react";

export interface CubingIconProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    size?: number;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    className?: string;
    style?: React.CSSProperties;
}

export const CubingIcon: React.FC<CubingIconProps> = ({
    icon: Icon,
    size = 24,
    onClick,
    className,
    style,
    ...rest
}) => (
    <Icon
        width={size}
        height={size}
        onClick={onClick}
        className={className}
        style={style}
        {...rest}
    />
);
