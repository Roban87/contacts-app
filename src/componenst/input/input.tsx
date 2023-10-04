import { Eyeicon } from '@/components/inputs/eye-icon';
import { InputHandlerOptions, InputValue } from '@/libs/hooks/form.hook';
import { ChangeEvent, useEffect, useState } from 'react';
import { InputWrapper } from './input-wrapper';
import React from 'react';

export interface InputProps {
    inputHandler: ({ inputKey, value, isValid }: InputHandlerOptions) => void;
    value: InputValue;
    name: string;
    label?: string;
    className?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'number' | 'email' | 'file';
    validators: ValidatorFunction[];
    validate?: boolean;
    disabled?: boolean;
    selector?: React.JSX.Element;
}

export interface ValidatorInterface {
    hasError: boolean;
    errorMessage: string;
}

export type ValidatorFunction = (value: any) => ValidatorInterface;

export const Input = (props: InputProps) => {
    const [isValid, setIsValid] = useState(true);
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isInFocus, setIsInFocus] = useState(false);
    const [type, setType] = useState(props?.type || 'text');

    const validate = (value: string): ValidatorInterface => {
        const hasErrors = !!props.validators && !!props.validators.length
            ? props.validators.map((validator: any) => validator(value)).filter((res: ValidatorInterface) => res.hasError)
            : [];

        if (!hasErrors.length) {
            return { hasError: false, errorMessage: '' };
        }

        return hasErrors[0];
    };

    const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const validationRes = validate(target.value);

        props.inputHandler({
            isValid: !validationRes.hasError,
            inputKey: props.name,
            value: target.value
        });

        setValue(target.value);
        setIsValid(!validationRes.hasError);
        setErrorMessage(validationRes.errorMessage);
    };

    useEffect(() => {
        if (props.validate) {
            const validationRes = validate(value);
            setIsInFocus(false);
            setIsValid(!validationRes.hasError);
            setErrorMessage(validationRes.errorMessage);
        }
    }, [props.validate]);

    return <InputWrapper
        label={props.label}
        name={props.name}
        hasError={!isValid}
        errorMessage={errorMessage}
        isInFocus={isInFocus}
        disabled={!!props.disabled}
    >
        <div className={`w-100 display-flex justify-content-space-between`}>
            <input
                onFocus={() => setIsInFocus(true)}
                onBlur={() => setIsInFocus(false)}
                onChange={(e) => handleOnChange(e)}
                value={props.value as any}
                className={`${props?.className || ''} ${props.disabled ? 'cursor-not-allowed' : ''}`}
                placeholder={props?.placeholder || ''}
                type={type}
                disabled={!!props.disabled}
            />
        </div>

    </InputWrapper>;
};
