import { cloneElement, useId, useState } from 'react';
import React from 'react';

export interface DropdownProps {
    trigger: React.JSX.Element;
    items: React.JSX.Element[];
    className: string;
    dropdown?: string;
    onClick?: (b: boolean) => void;
}

export const Dropdown = ({ trigger, items, className, onClick }: DropdownProps) => {
    const dropdownId = useId();
    const [open, setOpen] = useState(false);

    const handleTriggerClick = () => {
        setOpen(!open);

        if (onClick) {
            onClick(!open);
        }
    };

    const handleMouseOut = () => setOpen(false);

    return (
        <div className={`dropdown position-relative ${className}`} dropdown-id={dropdownId}
             onMouseLeave={handleMouseOut}
        >
            {cloneElement(trigger, {
                onClick: handleTriggerClick,
            })}

            {open && (
                <div className={'dropdown-items-container position-absolute'}>
                    {items?.map((menuItem, index) => (
                        <div
                            key={index}
                            className={'dropdown-item'}
                            onClick={() => {
                                !!menuItem.props.onClick && menuItem.props.onClick();
                                setOpen(false);
                            }}
                        >
                            {menuItem}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
