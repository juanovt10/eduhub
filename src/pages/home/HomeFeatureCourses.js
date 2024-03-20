import React from 'react';
import CoursesDisplay from '../courses/CoursesDisplay';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/Home.module.css'

const HomeFeatureCourses = () => {
    return (
        <div className='mb-5 text-center'>
            <h2>Featured courses</h2>
            <CoursesDisplay sortKey='rating' isHomePage />
            <Button className={styles.buttonPrimary}>
                <Link to='/courses' className={styles.links}>
                    Explore all courses!
                </Link>
            </Button>
        </div>
    )
}

export default HomeFeatureCourses