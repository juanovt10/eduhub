import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
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
            setIsInitialCheckDone(true)
        }, 3000)

        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        if (currentUser !== undefined) { 
            if (currentUser) {
                history.push('/');
            }
        }
    }, [currentUser, isInitialCheckDone, history]);

    console.log(currentUser)

    return (
        <div className={styles.DivContainer}>
            {!isInitialCheckDone ? (
                <Asset spinner />
            ) : (
                <>
                    <Nav fill variant="tabs" defaultActiveKey="/home" className={styles.tabs}>
                        <Nav.Item className={`${styles.linkDiv} ${styles.signUp} ${activeTab === 'signup' ? styles.activeLink : ''}`}>
                            <Nav.Link
                                eventKey='signup'
                                onClick={() => setActiveTab('signup')}
                                className={activeTab === 'signup' ? styles.activeLink : ''}
                            >
                                Sign up
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className={`${styles.linkDiv} ${styles.signIn} ${activeTab === 'signin' ? styles.activeLink : ''}`}>
                            <Nav.Link
                                eventKey='signin'
                                onClick={() => setActiveTab('signin')}
                                className={`${activeTab === 'signin' ? styles.activeLink : ''}`} 
                            >
                                Sign in
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {activeTab === 'signup' && <SignUpForm onSignUpSuccess={handleSignUpSuccess} /> }
                    {activeTab === 'signin' && <SignInForm showSuccess={showSuccess} dismissSuccess={() => setShowSuccess(false)}/>}
                </>

                // <Tabs
                //     activeKey={activeTab}
                //     onSelect={(k) => setActiveTab(k)}
                //     id="fill-tab-example"
                //     className={styles.tabs}
                //     fill
                // >
                //     <Tab eventKey="signup" title="Sign Up" className={styles.tabContainer}>
                //         <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
                //     </Tab>
                //     <Tab eventKey="signin" title="Sign In" className={styles.tabContainer}>
                //         <SignInForm showSuccess={showSuccess} dismissSuccess={() => setShowSuccess(false)}/>
                //     </Tab>
                // </Tabs>
            )}


        {/* <div className={styles.DivContainer}>
            {!isInitialCheckDone ? (
                <Asset spinner />
            ) : (
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
            )} */}
        </div>
    )
}

export default Authenticator