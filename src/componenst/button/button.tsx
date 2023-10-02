import * as React from 'react';

export interface ButtonProps {
    type: 'primary' | 'secondary' | 'special';
    icon?: React.JSX.Element;
    title?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export function Button({ type, icon, title, onClick, disabled, className }: ButtonProps) {
    if (!!icon && !title) {
        return <button
            className={`button ${type} only-icon ${className}`}
            disabled={disabled}
            onClick={() => onClick ? onClick() : null}
        >
            {icon}
        </button>;
    }

    if (!icon && !!title) {
        return <button
            className={`button ${type} only-title ${className}`}
            disabled={disabled}
            onClick={() => onClick ? onClick() : null}
        >
            {<p>{title}</p>}
        </button>;
    }

    return <button
        className={`button ${type} with-icon ${className}`}
        disabled={disabled}
        onClick={() => onClick ? onClick() : null}
    >
        {icon}
        {<p>{title}</p>}
    </button>;
}
