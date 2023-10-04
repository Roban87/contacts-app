import { Button } from '@/componenst/button/button';
import { Icon } from '@/componenst/icon';
import ProfilePic from '@/componenst/profile-pic/profile-pic';
import * as React from 'react';

export interface ImageUploaderProps {
    path: string;
    uploadImage: (e: any) => void;
    inputHandler: ({}: any) => void;
}

export default function ImageUploader({ path, uploadImage, inputHandler }: ImageUploaderProps) {
    return <div className={'display-flex align-items-center mb-6'}>
        <ProfilePic
            className={'mr-4'}
            size={88}
            imageSrc={path}
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
    </div>;
}
