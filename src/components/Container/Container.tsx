import React, {FC} from 'react';
import classes from './Container.module.scss';

type ContainerProps = {
    children: React.ReactNode;
}
const Container: FC<ContainerProps> = ({children}) => {
    return (
        <div className={classes.Container}>
            {children}
        </div>
    );
};

export default Container;
