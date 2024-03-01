import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import CourseDetail from './CourseDetail';
import CourseCard from './CourseCard';
import ReviewCreateForm from '../reviews/ReviewCreateForm';
import { useCurrentUser } from '../../context/CurrentUserContext';

const CoursePage = (props) => {  

    const { id } = useParams();
    const currentUser = useCurrentUser();
    const [course, setCourse] = useState({ results: [] });
    const [reviews, setReviews] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: course}] = await Promise.all([
                    axiosReq.get(`/courses/${id}`)
                ])
                setCourse({results: [course]})
                console.log(course)
            } catch(err) {

            }
        };

        handleMount();
    }, [id])

    return (
        <div>
            <Row>
                <Col>
                    <CourseDetail {...course.results[0]} setCourses={setCourse}/>
                </Col>
                
            </Row>
            <Row>
                <Col>
                    {currentUser ? (
                        <ReviewCreateForm
                            course={id}
                            setCourse={setCourse}
                            setReviews={setReviews}    
                     />
                    ) : reviews.results?.length ? (
                        'Comments'
                    ) : null }             
                </Col>
            </Row>
        </div>
    )
}

export default CoursePage