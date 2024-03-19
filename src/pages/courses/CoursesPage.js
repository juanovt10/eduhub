import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CoursesDisplay from './CoursesDisplay';
import CourseFilter from './CourseFilter';
import CourseSorting from './CourseSorting';
import styles from '../../styles/CoursesPage.module.css';
import { useCurrentUser } from '../../context/CurrentUserContext';


const CoursesPage = () => {
    const [sortKey, setSortKey] = useState('default');
    const [filters, setFilters] = useState({});
    const currentUser = useCurrentUser();

    console.log(currentUser)
    
    const handleFiltersApplied = (newFilters) => {
        setFilters(newFilters);
    }

    const handleSorting = (newSortKey) => {
        setSortKey(newSortKey)
    }

    return (
        <div className={`d-flex flex-column align-items-center justify-content-center`}>
            <h1 className={`text-center ${styles.pageTitle}`}>Explore our courses</h1>
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