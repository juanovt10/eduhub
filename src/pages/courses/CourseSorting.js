import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/CourseSorting.module.css';


const CourseSorting = ({ onSortingApplied, onHide, mobile }) => {
    const [activeKey, setActiveKey] = useState("");

    const handleSorting = (key) => {
        setActiveKey(key);
        onSortingApplied(key);
        onHide();
    };

    const navItems = (
        <>
            <Nav.Item className={`${styles.tab} ${activeKey === 'rating' ? styles.activeLink : styles.inactiveLink}`} >
                <Nav.Link onClick={() => handleSorting('rating')}>
                    <i class="fa-solid fa-star"></i> Highly rated
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={activeKey === 'price' ? styles.activeLink : styles.inactiveLink}>
                <Nav.Link onClick={() => handleSorting('price')}>
                    <i class="fa-solid fa-hand-holding-dollar"></i> Lowest price
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={activeKey === 'creation' ? styles.activeLink : styles.inactiveLink}>
                <Nav.Link onClick={() => handleSorting('creation')}>
                    <i class="fa-solid fa-clock"></i> Newest
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={activeKey === 'enrollments' ? styles.activeLink : styles.inactiveLink}>
                <Nav.Link onClick={() => handleSorting('enrollments')}>
                    <i class="fa-solid fa-graduation-cap"></i> Enrollments
                </Nav.Link>
            </Nav.Item>
        </>
    )

    return (
        <div>
            {!mobile ? (
                <Nav fill variant="tabs" defaultActiveKey="/home" className={`mb-2 ${styles.tabContainer}`}>
                    <Nav.Item>
                        <Nav.Link disabled>
                            <span className={styles.disabledTab}>
                                <i class="fa-solid fa-arrow-down"></i> <i class="fa-solid fa-arrow-up"></i> Sort By:
                            </span>
                        </Nav.Link>
                    </Nav.Item>
                    {navItems}
                </Nav>
            ) : (
                <SheetContent className={`${styles.sheetContainer} ${styles.editCourseSheetContainer}`} side={'right'}>
                    <SheetHeader>
                        <SheetTitle className={styles.sheetTitle}>Sort by:</SheetTitle>
                    </SheetHeader>
                    <Nav fill variant="tabs" defaultActiveKey="/home">
                        {navItems}
                    </Nav>
                </SheetContent>
            )}
        </div>
    )
}

export default CourseSorting