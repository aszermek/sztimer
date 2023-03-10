import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Icon, IIconProps } from "./Icon";

export interface IInputAlertProps {
    label?: string;
    icon?: IIconProps;
}

export interface IInputProps {
    label?: string;
    value?: string | number;
    icon?: IIconProps;
    onChange?: (newValue: string | number) => void;
    onSubmit?: (value: string | number) => void;
    isTimer?: boolean;
    error?: IInputAlertProps;
    forceFocus?: boolean;
}

class Input extends React.Component<IInputProps> {
    public static defaultProps: Partial<IInputProps> = {};

    value: string | number = this.props.value;
    isFocused: boolean = this.props.forceFocus;

    constructor(props: IInputProps) {
        super(props);

        makeObservable(this, {
            value: observable,
            isFocused: observable,
            update: action,
            onChange: action,
            onFocus: action,
            onBlur: action,
            onSubmit: action,
        });
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        if (this.props.forceFocus) {
            this.onFocus();
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    handleKeyDown = (event: KeyboardEvent) => {
        if (this.isFocused && event.key === "Enter") {
            this.onSubmit(this.value);
        }
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        this.update("value", value);

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    onFocus = (e?: React.FocusEvent<HTMLInputElement>) => {
        this.update("isFocused", true);
    };

    onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        this.update("isFocused", false);
    };

    onSubmit = (value: string | number) => {
        if (this.props.onSubmit) {
            this.props.onSubmit(value);
        }

        setTimeout(() => {
            if (!this.props.error || this.props.error === undefined) {
                this.value = "";
            }
        }, 10);
    };

    onClickIcon = () => {
        if (this.isFocused) {
            this.onSubmit(this.value);
            console.log("click icon", this.value);
        }
    };

    render() {
        const { label, value, icon, onChange, isTimer, error, forceFocus } =
            this.props;

        return (
            <div
                className={`flex flex-col gap-2 ${
                    isTimer && "justify-center w-2/3 max-w-[640px]"
                }`}
            >
                <div className={`relative`}>
                    <input
                        className={`
                        flex align-center rounded-lg w-full border border-1 border-slate-400
                        ${
                            isTimer
                                ? "rounded-lg p-3 font-vt323 text-9xl text-center shadow-emboss"
                                : "rounded-lg p-2"
                        }
                        ${
                            error
                                ? "border-red-600 focus:border-2 outline-none"
                                : "border-slate-400 focus:border-2 focus:border-black outline-none"
                        }
                        `}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        value={this.value}
                        autoFocus={forceFocus}
                    />
                    {!this.isFocused && !this.value && (
                        <div className="absolute inset-y-0 left-0 px-2 h-full flex items-center text-slate-400 pointer-events-none">
                            {label}
                        </div>
                    )}
                    <div
                        className={`absolute inset-y-0 right-0 px-2 py-1 h-full flex gap-2 items-center text-slate-400 hover:text-black cursor-pointer`}
                        onClick={icon?.onClick}
                    >
                        {!isTimer && <Icon {...icon} />}
                    </div>
                </div>

                {error && (
                    <div className="flex justify-between gap-3 text-red-600">
                        {error.label}
                        <Icon {...error.icon} />
                    </div>
                )}
            </div>
        );
    }
}

export default observer(Input);
