import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import styles from "../../styles/Authenticator.module.css";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const Authenticator = () => {

    const location = useLocation();
    const [key, setKey] = useState('signup')
    const [trigger, setTrigger] = useState(location.state?.fromSignup)

    useEffect(() => {
        if (location.state?.fromSignup) {
            setKey('signin')
        } else {
            setKey('signup')
        }

        setTrigger(location.state?.fromSignup)
    }, [trigger])

    return (
        <div className={styles.DivContainer}>
            <Tabs
                defaultActiveKey={key}
                id="fill-tab-example"
                className={styles.tabs}
                fill
            >
                <Tab eventKey="signup" title="Sign Up" className={styles.tabContainer}>
                    <SignUpForm />
                </Tab>
                <Tab eventKey="signin" title="Sign In" className={styles.tabContainer}>
                    <SignInForm />
                </Tab>
            </Tabs>
        </div>
    )
}

export default Authenticator