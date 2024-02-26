import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults';
import CourseCard from './CourseCard';

const CoursesPage = () => {
    const [courses, setCourses] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const {data} = await axiosReq.get('/courses/');
                setCourses({ results: data });
                setHasLoaded(true);
            } catch(err) {
                console.log(err)
            }
        }

        setHasLoaded(false);
        fetchCourses();
    }, []);

    return (
        <div>
            <h1 className='text-center my-5'>Explore our courses</h1>
            <Row>
                <Col md={3}>
                    FILTER CARD
                </Col>
                <Col md={9}>
                    {courses.results?.length ? (
                        console.log('Yes there is courses')
                        // courses.results.map((course, idx) => (
                        //     <CourseCard key={course.id} {...course.results[idx]} setCourses={setCourses} />
                        // ))
                    ) : (
                        console.log("no results")
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default CoursesPage