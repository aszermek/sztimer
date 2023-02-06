import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Icon, IIconProps } from "./Icon";
import Input from "./Input";

export interface IDropdownOption {
    key: string | number;
    value: string;
    icon?: IIconProps;
}

export interface IDropdownProps {
    label?: string;
    options?: IDropdownOption[];
    selectedKey?: string;
    onClick?: () => void;
    onChange?: (key: string | number, option: IDropdownOption) => void;
    newOption?: boolean;
    onSubmitNewOption?: () => void;
}

class Dropdown extends React.Component<IDropdownProps> {
    public static defaultProps: Partial<IDropdownProps> = {};

    selectedKey: string = this.props.selectedKey;
    isOpen: boolean = false;
    dropdownRef: HTMLDivElement;

    constructor(props: IDropdownProps) {
        super(props);

        makeObservable(this, {
            selectedKey: observable,
            isOpen: observable,
            update: action,
            onClick: action,
            onChange: action,
            selectedOption: computed,
        });
    }

    public update(key: keyof this, value: any) {
        this[key] = value;

        if (key === "isOpen") {
            setTimeout(() => {
                if (value) {
                    document.addEventListener("click", this.onClickOutside);
                } else {
                    document.removeEventListener("click", this.onClickOutside);
                }
            }, 10);
        }
    }

    onClick = () => {
        this.update("isOpen", true);
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    onClickOutside = (e: MouseEvent) => {
        const path =
            ((e as any).path as HTMLDivElement[]) || e.composedPath
                ? e.composedPath()
                : [];
        const isInDropdown = path.some((p) => p === this.dropdownRef);

        if (!isInDropdown) {
            this.update("isOpen", false);
        }
    };

    onChange = (option: IDropdownOption) => {
        this.update("selectedKey", option.key);
        if (this.props.onChange) {
            this.props.onChange(option.key, option);
        }
        this.update("isOpen", false);
    };

    get selectedOption(): IDropdownOption {
        return this.props.options.find(
            (option) => option.key === this.selectedKey
        );
    }

    render() {
        const { label, options, selectedKey, onClick, onChange, newOption, onSubmitNewOption } = this.props;
        const { icon, value } = this.selectedOption || {
            value: options[0].value,
            icon: undefined,
        };

        return (
            <div className="relative w-48">
                <button
                    className="bg-slate-200 p-2 rounded-lg w-full flex justify-between items-center"
                    onClick={this.onClick}
                >
                    {selectedKey ? (
                        <div className="flex gap-4 items-center mr-4">
                            {icon && <Icon {...icon} />}
                            {value}
                        </div>
                    ) : (
                        label
                    )}
                    <Icon icon={ChevronDownIcon} />
                </button>
                {this.isOpen && (
                    <div
                        ref={(dropdownRef) => (this.dropdownRef = dropdownRef)}
                        className={`absolute w-full z-10 bg-slate-200 rounded-lg`}
                    >
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="flex gap-4 p-2 items-center rounded-lg hover:bg-slate-300"
                                onClick={() => this.onChange(option)}
                            >
                                {option.icon && <Icon {...option.icon} />}
                                {option.value}
                            </div>
                        ))}
                        {newOption && <div className="flex items-center rounded-lg z-10"><Input label="Add session" icon={{icon: PlusIcon}} /></div>}
                    </div>
                )}
            </div>
        );
    }
}

export default observer(Dropdown);
