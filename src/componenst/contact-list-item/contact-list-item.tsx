import { Button } from '@/componenst/button/button';
import { Icon } from '@/componenst/icon';
import ProfilePic from '@/componenst/profile-pic/profile-pic';
import * as React from 'react';

export interface ContactListItemProps {
    imageSrc?: string;
    name: string;
    phone?: string;
}

export default function ContactListItem({ imageSrc, name, phone }: ContactListItemProps) {
    return <div className={'contact-list-item display-flex justify-content-between align-item-center py-3'}>

        <div className={'contact-info display-flex align-items-center'}>
            <ProfilePic
                imageSrc={imageSrc || ''}
                size={40}
                className={'mr-4'}
            />

            <div>
                <h3>{name}</h3>
                {phone && <small>{phone}</small>}
            </div>
        </div>

        <div className={'contact-control align-items-center'}>
            <Button
                icon={<Icon icon={'mute'} size={24}/>}
                type={'secondary'}
                onClick={() => console.log('new has been added')}
            />

            <Button
                icon={<Icon icon={'call'} size={24}/>}
                type={'secondary'}
                onClick={() => console.log('new has been added')}
            />

            <Button
                icon={<Icon icon={'more'} size={24}/>}
                type={'secondary'}
                onClick={() => console.log('new has been added')}
            />
        </div>
    </div>;
}
