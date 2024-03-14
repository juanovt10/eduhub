import React, { useEffect, useState } from 'react'; 
import { Col, Row } from 'react-bootstrap';
import CourseCard from './CourseCard';
import Asset from '../../components/Asset';
import { axiosReq } from '../../api/axiosDefaults';

const CoursesDisplay = ({ filters, sortKey }) => {
    const [coursesHasLoaded, setCoursesHasLoaded] = useState(false);
    const [courses, setCourses] = useState({ results: [] });
    console.log(filters)

    const fetchCourses = async () => {
        try {
            let url = '/courses/';
            const query = new URLSearchParams(filters).toString(); 
            if (query) url += `?${query}`;

            const {data} = await axiosReq.get(url);
            setCourses(data);
            sortCourses(data.results);
        } catch(err) {
            console.log(err)
        } finally {
            setCoursesHasLoaded(true);
        }
    };

    useEffect(() => {
        setCoursesHasLoaded(false);
        fetchCourses();
    }, [filters, sortKey])

    const sortCourses = (fetchedResults) => {
        const sortedCourses = [...fetchedResults]

        if (sortKey === 'rating') {
            sortedCourses.sort((a, b) => (b.overall_rating || 0) - (a.overall_rating || 0))
        } else if (sortKey === 'price') {
            sortedCourses.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        } else if (sortKey === 'creation') {
            sortedCourses.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        } else if (sortKey === 'enrollments') {
            sortedCourses.sort((a, b) => b.enrollments_count - a.enrollments_count)
        }

        setCourses(prevCourses => ({
            ...prevCourses,
            results: sortedCourses
        })); 
    }


    return (
        <div>
            {coursesHasLoaded ? (
                <Row >
                    {courses.results?.length ? (
                        courses.results.map(course => (
                            <Col xs={12} md={6} lg={4} className='d-flex justify-content-center p-0' key={course.id}>
                                <CourseCard {...course} setCourses={setCourses} />
                            </Col>
                        ))
                    ) : (
                        <Row>
                            <Col className='mt-5'>
                                <Asset message="No results" />
                            </Col>
                        </Row>
                    )}
                </Row>
            ) : (
                <Row>
                    <Col className='mt-5'>
                        <Asset spinner />
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default CoursesDisplay