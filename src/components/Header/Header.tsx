import React from 'react';
import classes from './Header.module.scss';
import {ReactComponent as Logo} from "../../assets/Logo.svg";
import Button from "../Button/Button";

const Header = () => {
    return (
        <header className={classes.Header}>
            <nav>
                <a href="/" className={classes.LogoLink}>
                    <Logo/>
                </a>
            </nav>
            <div className={classes.BtnWrapper}>
                <Button>Users</Button>
                <Button>Sign up</Button>
            </div>
        </header>
    );
};

export default Header;
