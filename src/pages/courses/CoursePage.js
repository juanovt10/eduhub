import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import CourseDetail from './CourseDetail';
import CourseCard from './CourseCard';
import ReviewCreateForm from '../reviews/ReviewCreateForm';
import { useCurrentUser } from '../../context/CurrentUserContext';
import ReviewCard from '../reviews/ReviewCard';
import Asset from '../../components/Asset';

const CoursePage = (props) => {  

    const { id } = useParams();
    const currentUser = useCurrentUser();
    const [course, setCourse] = useState({ results: [] });
    const [reviews, setReviews] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const handleMount = async () => {
            try {
                    const [courseResponse, reviewsResponse] = await Promise.all([
                    axiosReq.get(`/courses/${id}`),
                    axiosReq.get(`/ratings/?course=${id}`)
                ]);
                const courseData = courseResponse.data
                const reviewsData = reviewsResponse.data
                setCourse({ results: [courseData]})
                setReviews(reviewsData)
            } catch(err) {
                console.log(err)
            } finally {
                setHasLoaded(true);
            }
        };

        handleMount();
    }, [id])

    return (
        <div>
            {hasLoaded ? (
            <>
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
            </>
            ) : (
                <Row>
                    <Col className='mt-5'>
                        <Asset spinner/>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default CoursePage