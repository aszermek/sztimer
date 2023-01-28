import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

export interface IDropdownOption {
    key: string | number;
    value: string;
    icon?: React.ElementType;
}

export interface IDropdownProps {
    label?: string;
    options?: IDropdownOption[];
    selectedKey?: string;
    onClick?: () => void;
    onChanged?: (key: string | number, option: IDropdownOption) => void;
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
            onChanged: action,
            selectedOption: computed
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

    onChanged = (option: IDropdownOption) => {
        this.update("selectedKey", option.key);
        if (this.props.onChanged) {
            this.props.onChanged(option.key, option);
        }
        this.update("isOpen", false);
    };

    get selectedOption(): IDropdownOption {
        return this.props.options.find((option) => option.key === this.selectedKey);
    }

    render() {
        const { label, options, selectedKey, onClick, onChanged } = this.props;

        return (
            <div className="relative w-48">
                <button
                    className="bg-slate-200 p-2 rounded-lg w-full flex justify-between"
                    onClick={this.onClick}
                >
                    {selectedKey ? this.selectedOption.value : label}
                    <ChevronDownIcon className="w-6 h-6" />
                </button>
                {this.isOpen && (
                    <div
                        ref={(dropdownRef) => (this.dropdownRef = dropdownRef)}
                        className={`absolute w-full z-10 bg-slate-200 rounded-lg`}
                    >
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 hover:bg-gray-300"
                                onClick={() => this.onChanged(option)}
                            >
                                {option.icon && (
                                    <option.icon className="mr-2" />
                                )}
                                {option.value}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default observer(Dropdown);
