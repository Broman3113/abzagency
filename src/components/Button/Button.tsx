import React, {FC} from 'react';
import classes from './Button.module.scss';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'yellow';
    btnType?: 'button' | 'submit' | 'reset';
    style?: React.CSSProperties;
}
const Button: FC<ButtonProps> = ({
                                     children,
                                     onClick,
                                     className,
                                     disabled = false,
                                     type = "yellow",
                                     style,
                                     btnType,
                                 }) => {
    return (
        <button
            className={[classes.Button, classes[`Button--${type}`], className].join(' ')}
            onClick={onClick}
            disabled={disabled}
            type={btnType}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;
