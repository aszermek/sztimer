import { CheckIcon } from "@heroicons/react/20/solid";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Icon, IIconProps } from "./Icon";

export interface ICheckboxProps {
    label?: string;
    key?: string | number;
    value: boolean;
    onChanged?: (key: string | number, newValue: boolean) => void;
}

class Checkbox extends React.Component<ICheckboxProps> {
    public static defaultProps: Partial<ICheckboxProps> = {};

    value: boolean = this.props.value;

    constructor(props: ICheckboxProps) {
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

    onChanged = (key: string | number, newValue: boolean) => {
        if (this.value) {
            this.update("value", false);
        } else {
            this.update("value", true);
        }
        if (this.props.onChanged) {
            this.props.onChanged(key, newValue);
        }
    };

    render() {
        const { label, key, value, onChanged } = this.props;

        return (
            <div
                className="flex gap-2 cursor-pointer"
                onClick={() => this.onChanged(key, !value)}
            >
                <div className="flex justify-center items-center w-6 h-6 rounded-lg border border-slate-400">
                    {value && <Icon icon={CheckIcon} />}
                </div>
                {label}
            </div>
        );
    }
}

export default observer(Checkbox);
