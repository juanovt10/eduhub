import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import styles from "../../styles/Authenticator.module.css";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { Card } from 'react-bootstrap';
import logo from '../../assets/eduhub-color-logo.png'

const Authenticator = () => {
    return (
        <div className={styles.DivContainer}>
            <Card className={styles.Card}>
                <Card.Header className={styles.tabsHeader}>
                    <Tabs
                        defaultActiveKey="signup"
                        id="fill-tab-example"
                        className="mb-0 p-0"
                        fill
                    >
                        <Tab eventKey="signup" title="Sign Up" className={styles.tab}>
                            <SignUpForm />
                        </Tab>
                        <Tab eventKey="signin" title="Sign In" className={styles.tab}>
                            <SignInForm />
                        </Tab>
                    </Tabs>
                </Card.Header>
            </Card>



        </div>
    )
}

export default Authenticator