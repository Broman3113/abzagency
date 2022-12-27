import React, {useEffect} from 'react';
import * as yup from 'yup';

import classes from './Form.module.scss';
import {ReactComponent as SuccessImage} from "../../assets/success-image.svg";

import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchPositionsThunk} from "../../store/positionsSlice";
import {Formik} from "formik";
import {postUserThunk} from "../../store/usersSlice";

const styles = {
    mb50: {
        marginBottom: '50px'
    },
    mb43: {
        marginBottom: '43px'
    },
    blockCenter: {
        margin: '0 auto',
        display: 'block'
    },
    textAlignCenter: {
        textAlign: 'center'
    }
}

export function checkIfFilesResolutionCorrect(files?: [File]): boolean {
    let valid = true
    if (files) {
        files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    if (img.width < 70 || img.height < 70) {
                        valid = false
                    }
                }
            }
        })
    }
    return valid
}

let formValidationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .min(2, 'Min length is 2 symbols')
        .max(60, 'Max length is 60 symbols'),
    email: yup
        .string()
        .required('Email is required')
        .min(2, 'Min length is 2 symbols')
        .max(100, 'Max length is 60 symbols')
        .matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'Email is not valid'),
    phone: yup
        .string()
        .required('Phone is required')
        .matches(/(\+380)[0-9]{9}$/, 'Example: +380123456789'),
    position_id: yup
        .number()
        .required('Position is required'),
    photo: yup
        .mixed()
        .nullable()
        .required('A file is required')
        .test('FILE_SIZE',
            'Uploaded file should be less than 5MB',
            (value) => !value || (value && value.size <= 1024 * 1024))
        .test('FILE_FORMAT',
            'We support only jpg/jpeg',
            (value) => !value || (value && ['image/jpg', 'image/jpeg'].includes(value?.type)))
        .test('FILE_RESOLUTION',
            'Uploaded file should be at least 70x70px',
            (value) => !value || (value && checkIfFilesResolutionCorrect([value])))
})


const Form = () => {
    const dispatch = useAppDispatch();
    const {positions} = useAppSelector(state => state.positions);
    const {postStatus} = useAppSelector(state => state.users);
    console.log(positions);

    useEffect(() => {
        dispatch(fetchPositionsThunk());
    }, []);

    if (postStatus.status === 'success') {
        return (
            <div className={classes.FormSuccess}>
                <Heading type="h2" style={styles.mb50}>User successfully registered</Heading>
                <SuccessImage/>
            </div>
        )
    }

    return (
        <div className={classes.FormWrapper}>
            <Heading type={"h2"} className={classes.FormHeading}>Working with POST request</Heading>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    position_id: 0,
                    photo: '',
                }}
                validationSchema={formValidationSchema}
                onSubmit={(values) => {
                    // same shape as initial values
                    console.log(values);
                    const formData = new FormData();
                    formData.append('name', values.name);
                    formData.append('email', values.email);
                    formData.append('phone', values.phone);
                    formData.append('position_id', Number(values.position_id) as any);
                    formData.append('photo', values.photo);
                    dispatch(postUserThunk(formData));
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleSubmit,
                      getFieldProps,
                      setFieldValue,
                      isValid,
                  }) => (
                    <form className={classes.Form} onSubmit={handleSubmit}>
                        <Input label={'Your name'}
                               style={styles.mb50}
                               {...getFieldProps('name')}
                               errorText={touched.name && errors.name ? errors.name : ''}/>
                        <Input label={'Email'}
                               style={styles.mb50}
                               {...getFieldProps('email')}
                               errorText={touched.email && errors.email ? errors.email : ''}/>
                        <Input label={'Phone'}
                               style={styles.mb43}
                               {...getFieldProps('phone')}
                               errorText={touched.phone && errors.phone ? errors.phone : ''}
                               helperText={'+38 (XXX) XXX - XX - XX'}/>
                        <p className={classes.InputHeading}>Select your position</p>
                        <div className={classes.InputRadioWrapper} {...getFieldProps('position_id')}>
                            {positions.map(position => <Input key={position.id}
                                                              name="position_id"
                                                              type="radio"
                                                              value={position.id}
                                                              label={position.name}
                            />)}
                            {touched.position_id && errors.position_id
                                ? <p className={classes.InputError}>{errors.position_id}</p>
                                : ''}
                        </div>
                        <Textarea style={styles.mb50}
                                  type="file"
                                  onChange={(e: any) => {
                                      console.log(e.target.files);
                                      setFieldValue("photo", e.target.files[0] || '');
                                  }}
                            // @ts-ignore
                                  fileName={values.photo.name}
                                  errorText={errors.photo ? errors.photo : ''}
                        />
                        <Button type="yellow"
                                btnType="submit"
                                style={styles.blockCenter}
                                disabled={
                                    !isValid ||
                                    (Object.keys(touched).length === 0 && touched.constructor === Object)}
                        >Submit</Button>
                    </form>
                )}

            </Formik>
        </div>
    );
};

export default Form;
