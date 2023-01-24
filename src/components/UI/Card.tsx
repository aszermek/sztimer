import * as React from "react";

export interface ICardProps {
    children?: React.ReactNode;
    className?: string;
}

export class Card extends React.Component<ICardProps> {
    render() {
        const { children, className } = this.props;

        return (
            <div className="m-6 p-6 bg-white rounded-xl ">
                <div className={className}>{children}</div>
            </div>
        )
    }
}
