import { Image, ImageProps } from 'react-native';
import clsx from 'clsx';
import React from 'react';

type AvatarProps = ImageProps & {
    size?: "small" | "medium" | "large"
}
export function Avatar({ size = "medium", ...res}: AvatarProps) {
    return (
        <Image className={clsx("rounded-full", {
            "w-10 h-10 ": size === "small",
            "w-14 h-14 ": size === "medium",
            "w-20 h-20 ": size === "large",
            })} {...res}/>
    )
}