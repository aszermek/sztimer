import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

export interface IModalProps {
    header?: string;
    isOpen?: boolean;
    onDismiss?: () => void;
    size?: any;
    scrollable?: boolean;
    children: React.ReactNode;
}

class Modal extends React.Component<IModalProps> {
    constructor(props: IModalProps) {
        super(props);
        makeAutoObservable(this, {});
    }

    componentDidMount(): void {
		if (this.props.isOpen) {
			this.updateHtml(true);

			document.addEventListener('keydown', this.handleKeyDown);
		}
	}

	handleKeyDown = (event: KeyboardEvent) => {
		if (this.props.onDismiss && event.key === 'Escape') {
			this.props.onDismiss();
		}
	};

	componentDidUpdate(prevProps: Readonly<IModalProps>): void {
		if (prevProps.isOpen && !this.props.isOpen) {
			this.updateHtml(false);
		} else if (!prevProps.isOpen && this.props.isOpen) {
			this.updateHtml(true);
		}
	}

	componentWillUnmount(): void {
		if (this.props.isOpen) {
			this.updateHtml(false);
		}

		document.removeEventListener('keydown', this.handleKeyDown);
	}

	updateHtml(state: boolean) {
		const htmls = document.querySelectorAll('html');

		htmls.forEach((html) => {
			if (state) {
				html.classList.add('SLModal-OpenHtml');
			} else {
				html.classList.remove('SLModal-OpenHtml');
			}
		});
	}

	public render() {
		const { header, isOpen, size, scrollable, onDismiss, children } = this.props;

		if (!isOpen) {
			return null;
		}

		return (
			<Portal>
				<div className={slim ? 'SLModal-Slim' : 'SLModal'} style={mergedStyles}>
					<div className="SLModal-Overlay">
						<div className="SLModal-Overlay-Background"></div>

						<Row className="SLModal-Overlay-Wrapper">
							<UnderLarge>
								<Column {...columnProps} className={columnClasses} col={respColSize}>
									<SLBackground type={background} className={type === 'White' ? 'SLModal-Modal-White' : 'SLModal-Modal'}>
										<div className="SLModal-Header">
											<Container>
												<Row>
													<Column>
														{title && (
															<div>
																<SLHeading type={slim ? 'H3' : 'H2'}>{title}</SLHeading>
															</div>
														)}
													</Column>

													<Column>
														{onDismiss && (
															<div className="SLModal-Header-Close">
																<SLRoundButton
																	onClick={onDismiss}
																	type={closeButton}
																	icon={{
																		icon: InterfaceEssentialFormValidationClose
																	}}
																	size={slim ? 'Small' : 'Normal'}
																	{...closeButtonProps}
																/>
															</div>
														)}
													</Column>
												</Row>
											</Container>
										</div>

										<div className={contentClasses}>
											<Container>{children}</Container>
										</div>

										{footer && (
											<div className={footerClasses}>
												<Container>{footer}</Container>
											</div>
										)}
									</SLBackground>
								</Column>
							</UnderLarge>
							<OverLarge>
								<Column {...columnProps} className={columnClasses} col={size}>
									<SLBackground type={background} className={type === 'White' ? 'SLModal-Modal-White' : 'SLModal-Modal'}>
										<div className="SLModal-Header">
											<Container>
												<Row>
													<Column>
														{title && (
															<div>
																<SLHeading type={slim ? 'H3' : 'H2'}>{title}</SLHeading>
															</div>
														)}
													</Column>

													<Column>
														{onDismiss && (
															<div className="SLModal-Header-Close">
																<SLRoundButton
																	onClick={onDismiss}
																	type={closeButton}
																	icon={{
																		icon: InterfaceEssentialFormValidationClose
																	}}
																	size={slim ? 'Small' : 'Normal'}
																	{...closeButtonProps}
																/>
															</div>
														)}
													</Column>
												</Row>
											</Container>
										</div>

										<div className={contentClasses}>
											<Container>{children}</Container>
										</div>

										{footer && (
											<div className={footerClasses}>
												<Container>{footer}</Container>
											</div>
										)}
									</SLBackground>
								</Column>
							</OverLarge>
						</Row>
					</div>
				</div>
			</Portal>
		);
	}
}

export default observer(Modal);