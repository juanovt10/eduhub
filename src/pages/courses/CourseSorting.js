import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from '../../styles/CourseSorting.module.css';


const CourseSorting = ({ onSortingApplied }) => {
    const [activeKey, setActiveKey] = useState("");

    const handleSorting = (key) => {
        setActiveKey(key);
        onSortingApplied(key);
    }

    return (
        <Nav fill variant="tabs" defaultActiveKey="/home" className={`mb-2 ${styles.tabContainer}`}>
            <Nav.Item className={styles.disabledTab}>
                <Nav.Link disabled ><i class="fa-solid fa-arrow-down"></i> <i class="fa-solid fa-arrow-up"></i> Sort By:</Nav.Link>
            </Nav.Item>
            <Nav.Item className={`${styles.tab} ${activeKey === 'rating' ? styles.activeLink : styles.inactiveLink}`} >
                <Nav.Link 
                    onClick={() => handleSorting('rating')}
                    className={activeKey === 'rating' ? styles.activeLink : styles.inactiveLink}
                    >
                        <i class="fa-solid fa-star"></i> Highly rated
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={activeKey === 'price' ? styles.activeLink : styles.inactiveLink}>
                <Nav.Link
                    onClick={() => handleSorting('price')}
                    className={activeKey === 'price' ? styles.activeLink : styles.inactiveLink}
                    >
                        <i class="fa-solid fa-hand-holding-dollar"></i> Lowest price
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={activeKey === 'creation' ? styles.activeLink : styles.inactiveLink}>
                <Nav.Link 
                    onClick={() => handleSorting('creation')}
                    className={activeKey === 'creation' ? styles.activeLink : styles.inactiveLink}
                    >
                        <i class="fa-solid fa-clock"></i> Newest
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={activeKey === 'enrollments' ? styles.activeLink : styles.inactiveLink}>
                <Nav.Link 
                    onClick={() => handleSorting('enrollments')}
                    className={activeKey === 'enrollments' ? styles.activeLink : styles.inactiveLink}
                >
                    <i class="fa-solid fa-graduation-cap"></i> Enrollments
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default CourseSorting