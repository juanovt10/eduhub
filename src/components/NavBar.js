import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/eduhub-color-logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../App';

export const NavBar = () => {
    const currentUser = useContext(CurrentUserContext);
    const loggedInIcons = (
        <>
            {currentUser?.username}
        </>
    )
    const loggedOutIcons = (
        <>
            <NavLink to='/signup' className={styles.Navlink} >Sign Up</NavLink>
            <NavLink to='/signin' className={styles.Navlink} >Sign In</NavLink>
        </>
    );
        


    return (
        <Navbar expand="md" fixed="top" className={styles.Navbar}>
            <Container fluid>
                <NavLink to='/' >
                    <Navbar.Brand href="#">
                        <img src={logo} alt="logo" height="45" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
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
