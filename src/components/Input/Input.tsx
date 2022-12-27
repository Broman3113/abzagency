import React, {FC} from 'react';
import classes from './Input.module.scss';

type InputProps = {
    type?: 'text' | 'password' | 'email' | 'radio';
    label?: string;
    helperText?: string;
    name?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
    errorText?: string;
    [key: string]: any;
}
const Input: FC<InputProps> = ({
                                   type = 'text',
                                   label = '',
                                   helperText = '',
                                   name = '',
                                   value,
                                   onChange,
                                   style,
                                   errorText = '',
                                   ...props
                               }) => {
    if (type === 'radio') {
        return (
            <label className={classes.InputRadioField} style={style}>
                <input type={type} name={name} value={value} {...props}/>
                <span className={classes.CustomRadioButton}></span>
                <span className={classes.InputRadioFieldLabel}>{label}</span>
            </label>
        );
    }
    return (
        <label className={[classes.InputField, errorText ? classes.InputFieldError : ''].join(' ')} style={style}>
            <input className={classes.Input} type={type} onChange={onChange} name={name} value={value} placeholder=" "  {...props}/>
            <span className={classes.InputLabel}>{label}</span>
            <span className={[classes.HelperText].join(' ')}>{errorText ? errorText : helperText}</span>
        </label>
    );
};

export default Input;
