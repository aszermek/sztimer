import type { IconProps } from "@phosphor-icons/react";
import { useState } from "react";

interface DuotoneHoverIconProps extends IconProps {
    icon: React.ComponentType<IconProps>;
    invert?: boolean;
}

export const DuotoneHoverIcon: React.FC<DuotoneHoverIconProps> = ({
    icon: Icon,
    invert,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={props.onClick && "cursor-pointer"}
        >
            <Icon
                {...props}
                weight={!invert === isHovered ? "duotone" : "regular"}
            />
        </div>
    );
};
