import Image from 'next/image';
import * as React from 'react';
import defaultImage from '../../../public/assets/images/default.png';

export interface ProfilePicProps {
    size: number;
    imageSrc?: string;
    quality?: number;
    className?: string;
}

export default function ProfilePic({ size, imageSrc, quality, className }: ProfilePicProps) {
    return <Image
        className={`profile-pic ${className}`}
        src={imageSrc ? imageSrc : defaultImage}
        alt={'profile image'}
        width={size} height={size}
        quality={quality}
    />;
}
