import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import logo from '../assets/eduhub-color-logo.png';
import styles from '../styles/NavBar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Sheet } from "../@/components/ui/sheet";
import CourseCreateForm from '../pages/courses/CourseCreateForm';
import EditProfileForm from '../pages/profiles/EditProfileForm';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const location = useLocation();
    const history = useHistory();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const [profileData, setProfileData] = useState({});
    const [showSheet, setShowSheet] = useState({
        showCourseSheet: false,
        showProfileSheet: false,
    })

    const handleSheetDisplay = (sheetType, bool) => {
        setShowSheet((prevSheet) => ({
            ...prevSheet,
            [sheetType]: bool,
        }))
    }


    const handleSignOut = async () => {
        try {
            await axios.post('/dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getProfileData = async () => {
            if (currentUser?.profile_id) {
                try {
                    const userProfileResponse = await axiosReq.get(`/profiles/${currentUser.profile_id}`);
                    setProfileData(userProfileResponse.data);
                } catch (err) {
                    console.log(err);
                }
            };
        };
        getProfileData();
    }, [currentUser]);

    useEffect(() => {
        if (location.state?.openProfileSheet) {
            handleSheetDisplay('showProfileSheet', true);
            history.replace({ ...location, state: {}});
        }
    }, [location, history])

    const loggedInIcons = (
        <>
            {profileData.is_instructor && (
                <>
                    <div className={`mx-2 ${styles.Navlink}`}>
                        <Button 
                            className={`${styles.buttonSecondary}`}
                            onClick={() => handleSheetDisplay('showCourseSheet', true)}
                        >
                            Create Course
                        </Button>
                    </div>
                    <Sheet open={showSheet.showCourseSheet} onOpenChange={setShowSheet}>
                        <CourseCreateForm 
                            onHide={() => handleSheetDisplay('showCourseSheet', false)}
                        />
                    </Sheet>
                </>
            )}

            {!profileData.bio && (
                <Sheet open={showSheet.showProfileSheet} onOpenChange={setShowSheet}>
                    <EditProfileForm
                        open={showSheet.showProfileSheet}
                        onOpenChange={setShowSheet}
                        mode='create'
                        onHide={() => handleSheetDisplay('showProfileSheet', false)}
                    />
                </Sheet>
            )}

            <NavLink
                to='/' 
                onClick={handleSignOut} 
                className={styles.Navlink}
            >
                    <span className='mr-2'><i class="fa-solid fa-right-from-bracket"></i></span> Sign out 
            </NavLink>
            <NavLink 
                to={`/profiles/${currentUser?.profile_id}`}
                onClick={() => {}} 
                className={styles.Navlink}
            >
                <OverlayTrigger 
                    placement='bottom'
                    overlay={<Tooltip>{'Your Profile'}</Tooltip>}    
                >
                    <span>
                        <Avatar 
                            src={currentUser?.profile_image}
                            height={40}
                        />
                    </span>
                </OverlayTrigger>
            </NavLink>
        </>
    )
    const loggedOutIcons = (
        <>
            <NavLink to='/auth' className={styles.Navlink} >Join us!</NavLink>
        </>
    );

    return (
        <Navbar expanded={expanded} expand="md" fixed="top" className={styles.Navbar}>
            <Container fluid>
                <NavLink to='/' >
                    <Navbar.Brand className='d-flex align-items-center'>
                        <img src={logo} alt="logo" style={{ height: '40px'}} />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)} 
                    aria-controls="navbarScroll"
                />
                <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
                    <Nav className='text-right'>
                        <NavLink  to='/courses' className={styles.Navlink}>
                            <Button className={styles.buttonPrimary}>Explore our courses</Button>   
                        </NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
