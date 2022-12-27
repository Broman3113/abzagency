import React, {useEffect} from 'react';
import classes from './Home.module.scss';
import Header from "../../components/Header/Header";
import Preloader from "../../components/Preloader/Preloader";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import Heading from "../../components/Heading/Heading";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchUsersThunk} from "../../store/usersSlice";

const Home = () => {
    const dispatch = useAppDispatch();
    const {users, links, page, total_pages, fetchStatus} = useAppSelector(state => state.users);
    const loadMoreUsers = () => {
        if (links?.next_url) dispatch(fetchUsersThunk(links.next_url));
    }
    useEffect(() => {
        dispatch(fetchUsersThunk());
    }, []);
    return (
        <main className={classes.Home}>
            <div className={classes.HeaderWrapper}>
                <Container>
                    <Header/>
                </Container>
            </div>
            <section className={classes.Hero}>
                <Container>
                    <div className={classes.HeroWrapper}>
                        <Heading className={classes.Heading}>Test assignment for front-end developer</Heading>
                        <p className={classes.Text}>What defines a good front-end developer is one that has skilled
                            knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be
                            building web interfaces with accessibility in mind. They should also be excited to learn, as
                            the
                            world of Front-End Development keeps evolving.</p>
                        <Button>Sign up</Button>
                    </div>
                </Container>
            </section>
            <section className={classes.GetRequest}>
                <Container>
                    <Heading type={"h2"} className={classes.GetRequestHeading}>Working with GET request</Heading>
                    <ul className={classes.CardsList}>
                        {users.map(user => <li key={user.id}>
                            <Card user={user}/>
                        </li>)}
                    </ul>
                    {fetchStatus.status === "loading" && <Preloader style={{margin: '0 auto', display: 'block'}} />}
                    {fetchStatus.status === "error" && <p>{fetchStatus.error}</p>}
                    {page < total_pages && fetchStatus.status !== 'loading' &&
                        <Button style={{margin: '0 auto', display: 'block'}} onClick={loadMoreUsers}>Show more</Button>}

                </Container>
            </section>
            <section className={classes.Form}>
                    <Form/>
            </section>
        </main>
    );
};

export default Home;
