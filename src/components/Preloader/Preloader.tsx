import React, {FC} from 'react';
import classes from './Preloader.module.scss';

type PreloaderProps = {
    style?: React.CSSProperties;
}
const Preloader: FC<PreloaderProps> = ({style}) => {
    return (
        <div className={classes.Preloader} style={style}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Preloader;
