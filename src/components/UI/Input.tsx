import { CheckIcon } from "@heroicons/react/20/solid";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Icon, IIconProps } from "./Icon";

export interface IInputProps {
    label?: string;
    value?: string | number;
    onChanged?: (newValue: string | number) => void;
}

class Input extends React.Component<IInputProps> {
    public static defaultProps: Partial<IInputProps> = {};

    value: string | number = this.props.value;
    isFocused: boolean = false;

    constructor(props: IInputProps) {
        super(props);

        makeObservable(this, {
            value: observable,
            update: action,
            onChanged: action,
        });
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    onChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        this.props.onChanged(value);
    };

    render() {
        const { label, value, onChanged } = this.props;

        return (
            <div>
                <input />
            </div>
        );
    }
}

export default observer(Input);