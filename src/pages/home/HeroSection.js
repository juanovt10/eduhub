import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import styles from '../../styles/Home.module.css';

const HeroSection = () => {
    return (
        <div className={styles.hero}>
            <h1 className={styles.heroTitle}>Master by Teaching</h1> 
            <p w>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis eu volutpat odio facilisis mauris sit amet massa vitae.
            </p>
            <div>
                <Button className={`mr-3 ${styles.buttonSecondary}`}><a className={styles.links} href='#homeAbout'>Learn More</a></Button>
                <Button className={styles.buttonPrimary}><Link className={styles.links} to='/courses'>Explore Courses</Link></Button>
            </div>
        </div>
    )
}

export default HeroSection