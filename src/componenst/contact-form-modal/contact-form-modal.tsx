import { Button } from '@/componenst/button/button';
import { Icon } from '@/componenst/icon';
import { Input } from '@/componenst/input/input';
import Modal from '@/componenst/modal/modal';
import ProfilePic from '@/componenst/profile-pic/profile-pic';
import { useForm } from '@/hooks/form.hook';
import { useState } from 'react';
import * as React from 'react';
import { emailValidator, requiredValidator } from '@/libs/validators';

export interface ContactInterface {
    id?: string;
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
    handleSubmit: (data: ContactInterface | null, id?: string, ) => Promise<void>;
}

export default function ContactFormModal({ type, isOpen, setOpen, contact, handleSubmit }: ContactFormProps) {
    const [uploadUrl, setUploadUrl] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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

    const uploadImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/images', {
                method: 'POST',
                body: formData,
            });
            console.log('uploaded');
            const data = await response.json();
            setUploadUrl(data.url);
            console.log('data', data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
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
                <div className={'display-flex align-items-center mb-6'}>
                    <ProfilePic
                        className={'mr-4'}
                        size={88}
                        imageSrc={fields.image.value}
                    />

                    <div className={'uploader button primary with-icon mr-2'}>
                        <input className={'uploader-input'}
                               type={'file'}
                               accept={'image/*'}
                               onChange={(event) => uploadImage(event)}
                               multiple={false}
                        />
                        <div className={'display-flex justify-content-center align-items-center'}>
                            <Icon icon={'change'} size={24} wrapperClasses={'mr-2'}/>
                            <p>Change picture</p>
                        </div>
                    </div>

                    <Button
                        type={'primary'}
                        icon={<Icon icon={'delete'} size={24}/>}
                        onClick={() => inputHandler({ inputKey: 'image', value: '', isValid: true })}
                    />
                </div>

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
                    onClick={() => setOpen(false)}
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
