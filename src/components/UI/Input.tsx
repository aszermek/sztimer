import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Icon, IIconProps } from "./Icon";

export interface IInputProps {
    label?: string;
    value?: string | number;
    icon?: IIconProps;
    onChange?: (newValue: string | number) => void;
    onSubmit?: (value: string | number) => void;
    isTimer?: boolean;
}

class Input extends React.Component<IInputProps> {
    public static defaultProps: Partial<IInputProps> = {};

    value: string | number = this.props.value;
    isFocused: boolean = false;

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

    onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        this.update("isFocused", true);
    };

    onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        this.update("isFocused", false);
    };

    onSubmit = (value: string | number) => {
        if (this.props.onSubmit) {
            this.props.onSubmit(value);
        }
    };

    onClickIcon = () => {
        if (this.isFocused) {
            this.onSubmit(this.value);
        }
    }

    render() {
        const { label, value, icon, onChange, isTimer } = this.props;

        return (
            <div className={`relative flex ${isTimer && "justify-center"}`}>
                <input
                    className={`
                        flex align-center rounded-lg shadow-[inset_1px_0px_rgb(148 163 184)] border border-slate-400
                        ${
                            isTimer
                                ? "w-1/2 rounded-lg p-3 font-vt323 text-9xl text-center shadow-emboss"
                                : "w-full rounded-lg p-2"
                        }
                    `}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />
                {!this.isFocused && !this.value && (
                    <div className="absolute left-0 px-2 h-full flex items-center text-slate-400">
                        {label}
                    </div>
                )}
                <div
                    className={`absolute right-0 px-2 py-1 h-full flex items-center ${
                        !this.isFocused ? "text-slate-400" : "cursor-pointer"
                    }`}
                    onClick={this.onClickIcon}
                >
                    <Icon {...icon} />
                </div>
            </div>
        );
    }
}

export default observer(Input);
