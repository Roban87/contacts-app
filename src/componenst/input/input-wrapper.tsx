import { Children } from '@/libs/interfaces';
import React from 'react';

interface NormalWrapperProps {
    hasError: boolean;
    errorMessage: string;
    label?: string | undefined;
    name: string;
    children: Children;
    isInFocus: boolean;
    disabled?: boolean;
}

export const InputWrapper = (props: NormalWrapperProps) => {
    const errorClass = `error-${props.hasError && !props.isInFocus ? 'show' : 'hide'}--div`;
    const wrapperClasses = `center input-wrapper ${props.isInFocus ? 'focused': ''} cursor-pointer ${errorClass}`;
    const error = (props?.errorMessage || '');
    const disabledClasses = props.disabled ? 'bgc-dark-6 color-dark-4' : '';

    return <div className={`input display-flex flex-column w-100`}>

        {props.label && <label
            className={`input-label error-${props.hasError && !props.isInFocus ? 'show' : 'hide'}--label`}
            htmlFor={props.name}
        >
            {props.label}
        </label>}

        <div className={`${wrapperClasses} ${disabledClasses}`}>
            {props.children}
        </div>

        {props.hasError && !props.isInFocus && <small className={'error-show fs-12 color--additional-error'}>{error}</small>}
    </div>;
};
