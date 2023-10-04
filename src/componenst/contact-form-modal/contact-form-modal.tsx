import { Button } from '@/componenst/button/button';
import ImageUploader from '@/componenst/image-uploader/image-uploader';
import { Input } from '@/componenst/input/input';
import Modal from '@/componenst/modal/modal';
import { useForm } from '@/hooks/form.hook';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { emailValidator, requiredValidator } from '@/libs/validators';

export interface ContactInterface {
    image: string,
    name: string,
    phone: string,
    email: string
}

export interface ContactFormProps {
    type: 'create' | 'edit';
    isOpen: boolean;
    setOpen: (b: boolean) => void;
    contact?: any;
    handleSubmit: (data: ContactInterface | null, id?: string) => Promise<void>;
}

export default function ContactFormModal({ type, isOpen, setOpen, contact, handleSubmit }: ContactFormProps) {
    const [path, setPath] = useState<string>(contact?.image ? `/images/${contact?.image}` : '');
    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
    const { inputHandler, payload, isFormValid, fields } = useForm<ContactInterface>({
        fields: {
            image: {
                value: contact?.image || '',
                isValid: true,
            },
            name: {
                value: contact?.name || '',
                isValid: !!contact?.name || false,
            },
            phone: {
                value: contact?.phone || '',
                isValid: true,
            },
            email: {
                value: contact?.email || '',
                isValid: true,
            },
        },
        isFormValid: false,
    });

    useEffect(() => {
        contact?.image ? `/images/${contact?.image}` : ''
    }, []);

    const uploadImage = async (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsImageLoading(true);
            const response = await axios.post('/api/images/upload', formData);

            inputHandler({ inputKey: 'image', value: response.data.newFilename, isValid: true });
            setPath(`/images/${response.data.newFilename}`)
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsImageLoading(false);
        }
    }

    const clearForm = () => {
        for (const field of Object.keys(fields)) {
            inputHandler({
                inputKey: field,
                value: '',
                isValid: field !== 'name'
            })
        }
        setPath('');
        setOpen(false)
    }

    const submit = async () => {
        if (!isFormValid) {
            return null;
        }

        if (type === 'create') {
            await handleSubmit(payload)
        }

        if (type === 'edit') {
            await handleSubmit(payload, contact.id);
        }

        clearForm();
        setOpen(false);
    }

    return <Modal
        toggleModal={() => setOpen(!isOpen)}
        isOpen={isOpen}

        modalContent={<div>
            <div>
                <h2 className={'mb-6'}>{type === 'create' ? 'Add contact' : 'Edit contact'}</h2>
            </div>

            <div className={'display-flex flex-column'}>
                <ImageUploader
                    path={path}
                    uploadImage={uploadImage}
                    inputHandler={inputHandler}
                />

                <div className={'mb-6'}>
                    <Input
                        validators={[requiredValidator]}
                        inputHandler={inputHandler}
                        type={'text'}
                        name={'name'}
                        value={fields.name.value}
                        label={'Name'}
                        placeholder={'Jamie Wright'}
                    />
                </div>

                <div className={'mb-6'}>
                    <Input
                        validators={[]}
                        inputHandler={inputHandler}
                        type={'text'}
                        name={'phone'}
                        value={fields.phone.value}
                        label={'Phone number'}
                        placeholder={'+01 234 5678'}
                    />
                </div>

                <div className={'mb-6'}>
                    <Input
                        validators={[emailValidator]}
                        inputHandler={inputHandler}
                        type={'text'}
                        name={'email'}
                        value={fields.email.value}
                        label={'Email address'}
                        placeholder={'jamie.wright@mail.com'}
                    />
                </div>
            </div>

            <div className={'display-flex justify-content-end'}>
                <Button
                    type={'secondary'}
                    title={'Cancel'}
                    className={'mr-2'}
                    onClick={() => clearForm()}
                />

                <Button
                    type={'primary'}
                    title={'Done'}
                    onClick={() => submit()}
                />
            </div>
        </div>

        }
    />;
}
