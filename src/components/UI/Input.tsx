import { CheckIcon } from "@heroicons/react/20/solid";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Icon, IIconProps } from "./Icon";

export interface IInputProps {
    label?: string;
    value?: string | number;
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

    onSubmit = (value: string | number) => {
        if (this.props.onSubmit) {
            this.props.onSubmit(value);
        }
    };

    render() {
        const { label, value, onChange, isTimer } = this.props;

        return (
            <div className={`flex ${isTimer && "justify-center"}`}>
                <input
                    className={`
                        flex border border-slate-400 align-center
                        ${
                            isTimer
                                ? "w-1/2 rounded-lg p-3 font-vt323 text-9xl text-center shadow-emboss"
                                : "rounded-md px-2 py-1"
                        }
                    `}
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default observer(Input);
