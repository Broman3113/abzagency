import React, {FC} from 'react';

import classes from './Image.module.scss';
import {ReactComponent as PhotoCover} from "../../assets/photo-cover.svg";

type ImageProps = {
    src?: string | undefined;
}
const Image: FC<ImageProps> = ({src}) => {
    return (
        <div className={classes.ImageWrapper}>
            {src ? <img className={classes.Image} src={src} alt=""/> : <PhotoCover/>}
        </div>
    );
};

export default Image;
