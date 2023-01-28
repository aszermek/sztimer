import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

export interface IDropdownOption {
    key: string;
    value: string;
    icon?: React.ElementType;
}

export interface IDropdownProps {
    label?: string;
    isOpen?: boolean;
    options?: IDropdownOption[];
    selectedKey?: string;
    onClick?: () => void;
    onChanged?: () => void;
}

class Dropdown extends React.Component<IDropdownProps> {
    public static defaultProps: Partial<IDropdownProps> = {};

    selectedKey: string = this.props.selectedKey;
    isOpen: boolean = this.props.isOpen;

    constructor(props: IDropdownProps) {
        super(props);

        makeObservable(this, {
            selectedKey: observable,
            isOpen: observable,
            toggleDropdown: action,
            setSelectedKey: action
        });
    }
    
    onClick = () => {
        this.toggleDropdown();
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    
    onChanged = (option: IDropdownOption) => {
        this.setSelectedKey(option.key);
        if (this.props.onChanged) {
            this.props.onChanged();
        }
    }

    toggleDropdown = () => {
        if (this.isOpen) {
            this.isOpen = false;
        } else {
            this.isOpen = true;
        }
    }

    setSelectedKey = (key: string) => {
        this.selectedKey = key;
    }

    render() {
        const { label, isOpen, options, selectedKey, onClick, onChanged } = this.props;

        const selectedOption = options?.find(option => option.key === selectedKey);

        return (
            <div className={`relative ${isOpen ? 'block' : 'hidden'}`}>
                <button className="bg-white p-2 rounded-lg" onClick={this.onClick}>
                    {selectedOption ? selectedOption.value : label}
                </button>
                <div className={`absolute z-10 bg-white rounded-lg ${isOpen ? 'block' : 'hidden'}`}>
                    {options.map((option, index) => (
                        <div 
                            key={index}
                            className="px-4 py-2 hover:bg-gray-300"
                            onClick={() => this.onChanged(option)}
                        >
                            {option.icon && <option.icon className="mr-2" />}
                            {option.value}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default observer(Dropdown)