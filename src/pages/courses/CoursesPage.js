import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults';
import CourseCard from './CourseCard';
import Accordion from 'react-bootstrap/Accordion';

const CoursesPage = () => {
    const [courses, setCourses] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const {data} = await axiosReq.get('/courses/');
                setCourses(data);
                console.log(data.results)
                setHasLoaded(true);
            } catch(err) {
                console.log(err)
            }
        }

        setHasLoaded(false);
        fetchCourses();
    }, []);

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h1 className='text-center my-5'>Explore our courses</h1>
            <Container>
                <Row>
                    <Col md={3}>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Accordion Item #2</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                    <Col  md={9}>
                        {hasLoaded ? (
                            <Row>
                                {courses.results?.length ? (
                                    courses.results.map(course => (
                                        <Col className='mb-3' md={4} key={course.id}>
                                            <CourseCard {...course} setCourses={setCourses} />
                                        </Col>
                                        
                                    ))
                                ) : (
                                    console.log("no results")
                                )}
                            </Row>
                        ) : (
                            console.log('Show spinner')
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CoursesPage