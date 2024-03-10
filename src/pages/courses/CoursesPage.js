import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CoursesDisplay from './CoursesDisplay';
import CourseFilter from './CourseFilter';
import CourseSorting from './CourseSorting';


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
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h1 className='text-center my-5'>Explore our courses</h1>
            <Container>
                <Row>
                    <Col md={3}>
                        <CourseFilter onFiltersApplied={handleFiltersApplied} />
                    </Col>
                    <Col  md={9}>
                        <CourseSorting onSortingApplied={handleSorting}/>
                        <CoursesDisplay filters={filters} sortKey={sortKey} />
                    </Col>
                </Row>                
            </Container>
        </div>
    )
}

export default CoursesPage