import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/eduhub-color-logo.png';
import styles from '../styles/NavBar.module.css';

export const NavBar = () => {
    return (
        <Navbar expand="md" fixed="top" className={styles.Navbar}>
            <Container fluid>
                <Navbar.Brand href="#">
                    <img src={logo} alt="logo" height="45" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className='justify-content-start text-left'>
                    <Nav>
                        <Nav.Link className={styles.Navlink} href="#action1">Home</Nav.Link>
                        <Nav.Link className={styles.Navlink}href="#action2">Courses</Nav.Link>
                        <Nav.Link className={styles.Navlink}href="#action2">About</Nav.Link>
                        <Nav.Link className={styles.Navlink}href="#action2">Contact</Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse id="navbarScroll" className='justify-content-end text-left'>
                    <Nav className='text-right'>
                        <Nav.Link className={styles.Navlink}href="#action2">Sign Up</Nav.Link>
                        <Nav.Link className={styles.Navlink}href="#action2">Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
