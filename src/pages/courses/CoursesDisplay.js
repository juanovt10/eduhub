import React, { useEffect, useState } from 'react'; 
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import CourseCard from './CourseCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from '../../styles/CoursesDisplay.module.css';
import { Button } from 'react-bootstrap';
import { fetchMoreData } from '../../utils/utils';

const CoursesDisplay = ({ filters, sortKey, isHomePage }) => {
    const [coursesHasLoaded, setCoursesHasLoaded] = useState(false);
    const [courses, setCourses] = useState({ results: [] });
    const [moreCoursesHasLoaded, setMoreCoursesHasLoaded] = useState(false);


    const fetchCourses = async () => {
        try {
            let url = '/courses/';
            const query = new URLSearchParams(filters).toString(); 
            if (query) url += `?${query}`;

            const {data} = await axiosReq.get(url);
            setCourses(data);
            sortCourses(data.results);
        } catch(err) {

        } finally {
            setCoursesHasLoaded(true);
        };
    };

    useEffect(() => {
        setCoursesHasLoaded(false);
        fetchCourses();
    }, [filters, sortKey]);

    const sortCourses = (fetchedResults) => {
        const sortedCourses = [...fetchedResults];

        if (sortKey === 'rating') {
            sortedCourses.sort((a, b) => (b.overall_rating || 0) - (a.overall_rating || 0));
        } else if (sortKey === 'price') {
            sortedCourses.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortKey === 'creation') {
            sortedCourses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (sortKey === 'enrollments') {
            sortedCourses.sort((a, b) => b.enrollments_count - a.enrollments_count);
        };

        setCourses(prevCourses => ({
            ...prevCourses,
            results: sortedCourses
        }));
    };
    
    return (
        <div>
            {coursesHasLoaded ? (
                <Row className='justify-content-flex-start'>
                    {courses.results?.length ? (
                        courses.results.slice(0, isHomePage ? 2 : courses.results.length).map(course => (
                            <Col
                                xs={12}
                                md={courses.results?.length < 2 ? 12 : 6}
                                className={`d-flex justify-content-center flex-wrap p-0 ${isHomePage ? styles.thirdHomeCourse : ""}`} key={course.id}
                            >
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
                    {courses.next && !isHomePage && (
                        <div className='my-5 d-flex justify-content-center align-items-center'>
                            <Button
                                onClick={() => fetchMoreData(courses, setCourses,
                                    () => setMoreCoursesHasLoaded(true),
                                    () => setMoreCoursesHasLoaded(false))}
                                className={`${styles.buttonPrimary}`}
                            >
                            {!moreCoursesHasLoaded ? (
                                'Load more courses'
                            ) : (
                                <Asset spinner size='sm' />
                            )}
                            </Button>
                        </div>
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