import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/Home.module.css';

const HeroSection = () => {
    return (
        <div className={styles.hero}>
            <h1>Master by Teaching</h1> 
            <p>
                Dive into a world where teaching unlocks deeper understanding.
                Share your knowledge, create courses, and grow by teaching others.
                Join our community where curiosity meets mastery.       
            </p>
            <div>
                <Button className={`mr-3 ${styles.buttonSecondary}`}>
                    <a className={styles.links} href='#homeAbout'>
                        Learn More
                    </a>
                </Button>
                <Button className={styles.buttonPrimary}>
                    <Link className={styles.links} to='/courses'>
                        Explore Courses
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default HeroSection