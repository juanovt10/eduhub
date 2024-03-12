import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import styles from "../../styles/Authenticator.module.css";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { Card } from 'react-bootstrap';

const Authenticator = () => {
    return (
        <div className={styles.DivContainer}>
            <Card className={styles.Card}>
                <Card.Header>
                    <Tabs
                        defaultActiveKey="signup"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="signup" title="Sign Up">
                            <SignUpForm />
                        </Tab>
                        <Tab eventKey="signin" title="Sign In">
                            <SignInForm />
                        </Tab>
                    </Tabs>
                </Card.Header>
            </Card>



        </div>
    )
}

export default Authenticator