import type { IconProps } from "@phosphor-icons/react";
import { useState } from "react";

interface IDuotoneHoverIconProps extends IconProps {
    icon: React.ComponentType<IconProps>;
    invert?: boolean;
}

export const DuotoneHoverIcon = ({
    icon: Icon,
    invert,
    ...props
}: IDuotoneHoverIconProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Icon
                {...props}
                weight={!invert === isHovered ? "duotone" : "regular"}
            />
        </div>
    );
};
