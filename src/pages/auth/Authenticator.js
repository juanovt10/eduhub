import React, { useState } from 'react';
import styles from "../../styles/Authenticator.module.css";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Nav from 'react-bootstrap/Nav';
import { useRedirect } from '../../hooks/userRedirect';


const Authenticator = () => {

    const [activeTab, setActiveTab] = useState('signup');
    const [showSuccess, setShowSuccess] = useState(false);
    useRedirect('loggedIn');

    const handleSignUpSuccess = () => {
        setActiveTab('signin');
        setShowSuccess(true);
    }

    return (
        <div className={styles.DivContainer}>
            <>
                <Nav fill variant="tabs" defaultActiveKey="/home" className={styles.tabs}>
                    <Nav.Item className={`${styles.linkDiv} ${styles.signUp} ${activeTab === 'signup' ? styles.activeLink : ''}`}>
                        <Nav.Link
                            onClick={() => setActiveTab('signup')}
                        >
                            Sign up
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={`${styles.linkDiv} ${styles.signIn} ${activeTab === 'signin' ? styles.activeLink : ''}`}>
                        <Nav.Link
                            onClick={() => setActiveTab('signin')}
                        >
                            Sign in
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                {activeTab === 'signup' && <SignUpForm onSignUpSuccess={handleSignUpSuccess} />}
                {activeTab === 'signin' && <SignInForm showSuccess={showSuccess} dismissSuccess={() => setShowSuccess(false)} />}
            </>
        </div>
    )
}

export default Authenticator