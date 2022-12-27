import React, {FC} from 'react';
import classes from './Textarea.module.scss';

type TextareaProps = {
    style?: React.CSSProperties;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    fileName?: string;
    errorText?: string;
    [key: string]: any;
}
const Textarea: FC<TextareaProps> = ({style, onChange, name, fileName,errorText, ...props}) => {


    return (
        <>
            <label className={[classes.Textarea, fileName ? classes.Filled : '', errorText ? classes.Error : ''].join(' ')} style={style}>
                <input type="file" className={classes.InputFile} onChange={onChange} name={name} {...props}/>
                <span className={classes.UploadBtn}>Upload</span>
                <span className={classes.FileName}>{fileName || "Choose file"}</span>
                {errorText && <span className={classes.ErrorText}>{errorText}</span>}
            </label>
        </>
    );
};

export default Textarea;
