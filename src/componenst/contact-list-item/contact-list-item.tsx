import { Button } from '@/componenst/button/button';
import ContactFormModal, { ContactInterface } from '@/componenst/contact-form-modal/contact-form-modal';
import { Dropdown } from '@/componenst/dropdown/dropdown';
import { Icon } from '@/componenst/icon';
import ProfilePic from '@/componenst/profile-pic/profile-pic';
import { useState } from 'react';
import * as React from 'react';

export interface ContactListItemProps {
    contact: any;
    handleDelete: (i: number) => void;
    handleUpdate: (data: ContactInterface | null, id?: string) => Promise<void>;
}

export default function ContactListItem({ contact, handleDelete, handleUpdate }: ContactListItemProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return <div className={'contact-list-item display-flex justify-content-between align-item-center py-3'}>

        <div className={'contact-info display-flex align-items-center'}>
            <ProfilePic
                imageSrc={contact.imageSrc || ''}
                size={40}
                className={'mr-4'}
            />

            <div className={'data-container'}>
                <h3>{contact.name}</h3>
                <small>{contact.phone || '   '}</small>
            </div>
        </div>

        <div className={'contact-control align-items-center'}>
            <ContactFormModal
                contact={contact}
                type={'edit'}
                isOpen={isModalOpen}
                setOpen={setIsModalOpen}
                handleSubmit={handleUpdate}
            />

            <Button
                icon={<Icon icon={'mute'} size={24}/>}
                type={'secondary'}
                onClick={() => console.log('')}
            />

            <Button
                icon={<Icon icon={'call'} size={24}/>}
                type={'secondary'}
                onClick={() => console.log('')}
            />

            <Dropdown
                dropdown={contact.id}
                className={'contact-dropdown'}
                trigger={<Button
                    icon={<Icon icon={'more'} size={24}/>}
                    type={'secondary'}
                />}

                items={[
                    <div key={0} className={'display-flex justify-content-start align-items center'}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Icon icon={'settings'} size={20} wrapperClasses={'mr-3'}/>
                        <p>Edit</p>
                    </div>,

                    <div key={1} className={'display-flex justify-content-start align-items center'}>
                        <Icon icon={'favourite'} size={20} wrapperClasses={'mr-3'}/>
                        <p>Favourite</p>
                    </div>,

                    <div key={2} className={'display-flex justify-content-start align-items center'}
                         onClick={() => handleDelete(contact.id)}
                    >
                        <Icon icon={'delete'} size={20} wrapperClasses={'mr-3'}/>
                        <p>Remove</p>
                    </div>,
                ]}
            />
        </div>
    </div>;
}
