import React, {FC} from 'react';
import classes from './Card.module.scss';
import Image from "../Image/Image";
import {tUser} from "../../types/types";

type CardProps = {
    user: tUser;
}
const Card: FC<CardProps> = ({user}) => {
    const {name, email, phone, photo, position} = user;
    return (
        <div className={classes.Card}>
            <Image src={photo}/>
            <p className={classes.CardText}>{name}</p>
            <div className={classes.CardDetails}>
                <p className={classes.CardText}>{position}</p>
                <p className={classes.CardText}>{email}</p>
                <p className={classes.CardText}>{phone}</p>
            </div>
        </div>
    );
};

export default Card;
