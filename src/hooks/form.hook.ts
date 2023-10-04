import { useEffect, useState } from 'react';

export type InputValue = any;

export interface FormOptions {
    fields: Record<string, { value: InputValue, isValid: boolean }>;
    isFormValid: boolean;
}

export interface InputHandlerOptions {
    inputKey: string;
    value: InputValue;
    isValid: boolean;
}

export const useForm = <TPayload>(options: FormOptions) => {
    const [fields, setFields] = useState<FormOptions['fields']>(options.fields);
    const [payload, setPayload] = useState<TPayload | null>(null);
    const [isFormValid, setIsFormValid] = useState<boolean>(options.isFormValid);

    useEffect(() => {
        setIsFormValid(() => {
            for (const key of Object.keys(fields)) {
                if (!fields[key].isValid) {
                    return false;
                }
            }

            return true;
        });

        setPayload(() => {
            const data: any = {};
            for (const key of Object.keys(fields)) {
                data[key] = fields[key]?.value || '';
            }

            return data;
        });
    }, [fields]);

    const setForm = (data: FormOptions['fields']) => {
        const formData: FormOptions['fields'] = {};
        for (const key of Object.keys(fields)) {
            formData[key] = {
                value: (data?.[key] || '') as any,
                isValid: true
            };
        }

        setFields(formData);
    };

    const inputHandler = ({ inputKey, value, isValid }: InputHandlerOptions) => {
        setFields(prev => {
            return ({
                ...prev,
                [inputKey]: { value, isValid }
            });
        });
    };

    return { inputHandler, setForm, payload, isFormValid, fields };
};
