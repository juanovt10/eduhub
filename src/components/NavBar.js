import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/eduhub-color-logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

export const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post('/dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch(err) {
            console.log(err);
        }
    }

    const loggedInIcons = (
        <>
            <NavLink 
                to='/' 
                onClick={handleSignOut} 
                className={styles.Navlink}
            >
                    Sign out
            </NavLink>
            <NavLink 
                to={`/profiles/${currentUser?.profile_id}`}
                onClick={() => {}} 
                className={styles.Navlink}
            >
                <Avatar 
                    src={currentUser?.profile_image}
                    text="Profile"
                    height={40}
                />
            </NavLink>
        </>
    )
    const loggedOutIcons = (
        <>
            <NavLink to='/signup' className={styles.Navlink} >Sign Up</NavLink>
            <NavLink to='/signin' className={styles.Navlink} >Sign In</NavLink>
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
                <Navbar.Collapse id="navbarScroll" className='justify-content-start'>
                    <Nav>
                        <NavLink to='/' exact className={styles.Navlink} activeClassName={styles.Active}>Home</NavLink>
                        <NavLink to='/courses' className={styles.Navlink} activeClassName={styles.Active}>Courses</NavLink>
                        <NavLink to='/about' className={styles.Navlink} activeClassName={styles.Active}>About</NavLink>
                        <NavLink to='/contact'  className={styles.Navlink} activeClassName={styles.Active}>Contact</NavLink>
                        
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
                    <Nav className='text-right'>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
