import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import CourseDetail from './CourseDetail';
import CourseCard from './CourseCard';
import ReviewCreateForm from '../reviews/ReviewCreateForm';
import { useCurrentUser } from '../../context/CurrentUserContext';
import ReviewCard from '../reviews/ReviewCard';

const CoursePage = (props) => {  

    const { id } = useParams();
    const currentUser = useCurrentUser();
    const [course, setCourse] = useState({ results: [] });
    const [reviews, setReviews] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                // const [{data: course}, {data: reviews}] = await Promise.all([
                //     axiosReq.get(`/courses/${id}`),
                //     axiosReq.get(`/ratings/?course=${id}`)
                // ])
                // setCourse({results: [course]})
                // setReviews({results: reviews})

                const [courseResponse, reviewsResponse] = await Promise.all([
                    axiosReq.get(`/courses/${id}`),
                    axiosReq.get(`/ratings/?course=${id}`)
                ]);
                const courseData = courseResponse.data
                const reviewsData = reviewsResponse.data
                setCourse({ results: [courseData]})
                setReviews(reviewsData)
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
            <Row>
                <Col>
                    {reviews.results?.length ? (
                        reviews.results.map((review) => (
                            <ReviewCard 
                                key={review.id}
                                title={review.title}
                                owner={review.owner}
                                rating={review.rating}
                                content={review.content}
                                profile_image={review.profile_image}
                            />
                        ))
                    ) : (
                        'No reviews yet'
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default CoursePage