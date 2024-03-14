import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from "../../styles/Authenticator.module.css";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';


const Authenticator = () => {

    const [activeTab, setActiveTab] = useState('signup');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSignUpSuccess = () => {
        setActiveTab('signin');
        setShowSuccess(true);
    }

    return (
        <div className={styles.DivContainer}>
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                id="fill-tab-example"
                className={styles.tabs}
                fill
            >
                <Tab eventKey="signup" title="Sign Up" className={styles.tabContainer}>
                    <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
                </Tab>
                <Tab eventKey="signin" title="Sign In" className={styles.tabContainer}>
                    <SignInForm showSuccess={showSuccess} dismissSuccess={() => setShowSuccess(false)}/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Authenticator