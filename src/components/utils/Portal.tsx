import React from 'react';
import ReactDOM from 'react-dom';

export interface IPortalProps {
	id?: string;
	children?: JSX.Element | any;
}

export class Portal extends React.PureComponent<IPortalProps> {
	private el: HTMLDivElement;

	constructor(props: IPortalProps) {
		super(props);

		this.el = document.createElement('div');
	}

	public componentDidMount() {
		let target = document.body;

		if (this.props.id) {
            target = document.getElementById(this.props.id);
		}

		target.appendChild(this.el);
	}

	public componentWillUnmount() {
		let target = document.body;

		if (this.props.id) {
			target = document.getElementById(this.props.id);
		}

		target.removeChild(this.el);
	}

	public render() {
		return ReactDOM.createPortal(this.props.children, this.el);
	}
}
