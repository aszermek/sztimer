import * as React from "react";

export interface ICardProps {
    children?: React.ReactNode;
    className?: string;
}

const Card = ({ children, className }: ICardProps) => {
    return (
        <div className="col-span-3 m-6 p-6 bg-white rounded-xl">
            <div className={className}>{children}</div>
        </div>
    );
};

export default Card;