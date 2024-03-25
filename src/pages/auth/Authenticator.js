import React, { useEffect, useState } from 'react';
import styles from "../../styles/Authenticator.module.css";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Asset from '../../components/Asset';
import Nav from 'react-bootstrap/Nav';


const Authenticator = () => {

    const [activeTab, setActiveTab] = useState('signup');
    const [showSuccess, setShowSuccess] = useState(false);
    const currentUser = useCurrentUser();
    const history = useHistory();
    const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

    const handleSignUpSuccess = () => {
        setActiveTab('signin');
        setShowSuccess(true);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialCheckDone(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (currentUser !== undefined) { 
            if (currentUser) {
                history.push('/');
            };
        };
    }, [currentUser, isInitialCheckDone, history]);

    return (
        <div className={styles.DivContainer}>
            {!isInitialCheckDone ? (
                <Asset spinner />
            ) : (
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
                    {activeTab === 'signup' && <SignUpForm onSignUpSuccess={handleSignUpSuccess} /> }
                    {activeTab === 'signin' && <SignInForm showSuccess={showSuccess} dismissSuccess={() => setShowSuccess(false)}/>}
                </>
            )}
        </div>
    )
}

export default Authenticator