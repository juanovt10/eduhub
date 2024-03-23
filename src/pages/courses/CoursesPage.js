import React, { useState } from 'react'
import CoursesDisplay from './CoursesDisplay';
import CourseFilter from './CourseFilter';
import CourseSorting from './CourseSorting';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from '../../styles/CoursesPage.module.css';


const CoursesPage = () => {
    const [sortKey, setSortKey] = useState('default');
    const [filters, setFilters] = useState({});
    
    const handleFiltersApplied = (newFilters) => {
        setFilters(newFilters);
    }

    const handleSorting = (newSortKey) => {
        setSortKey(newSortKey)
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Our courses</h1>
            <div className='mx-5'>
                <Row>
                    <Col sm={4} md={3} className='d-none d-sm-block'>
                        <CourseFilter onFiltersApplied={handleFiltersApplied} />
                    </Col>
                    <Col sm={8} md={9}>
                        <CourseSorting onSortingApplied={handleSorting} />
                        <CoursesDisplay filters={filters} sortKey={sortKey} />
                    </Col>
                </Row>                
            </div>
        </div>
    )
}

export default CoursesPage