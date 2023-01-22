import * as React from "react";

export interface IModalProps {
    header?: string;
}

export class Modal extends React.Component<IModalProps> {
    render() {
        const { header } = this.props;

        return null;
    }
}
