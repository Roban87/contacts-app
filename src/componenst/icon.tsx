import * as React from 'react';

export interface IconProps {
    icon: string;
    size: 20 | 24;
    wrapperClasses?: string;
    wrapperStyles?: any;
}

export function Icon({ icon, size, wrapperClasses, wrapperStyles }: IconProps) {
    return <div className={wrapperClasses} style={{ ...wrapperStyles, width: size, height: size }}>
        <i
            className={`contact-app-icon ${icon} size-${size}`}
        />
    </div>;
}
