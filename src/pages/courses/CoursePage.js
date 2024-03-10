import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Container, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import CourseDetail from './CourseDetail';
import CourseCard from './CourseCard';
import ReviewCreateForm from '../reviews/ReviewCreateForm';
import { useCurrentUser } from '../../context/CurrentUserContext';
import ReviewCard from '../reviews/ReviewCard';
import Asset from '../../components/Asset';
import CourseEditForm from './CourseEditForm';

const CoursePage = () => {  

    const { id } = useParams();
    const currentUser = useCurrentUser();
    const [course, setCourse] = useState({ results: [] });
    const [reviews, setReviews] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    

    const handelShowModal = () => setShowEditModal(true)
    const handleHideModal = () => setShowEditModal(false)

    const reFetchCourseData = async () => {
        try {
            const response = await axiosReq.get(`/courses/${id}`);
            setCourse({ results: [response.data]})
        } catch (err) {
            console.log(err)
        }
    }

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
                console.log(courseData)
            } catch(err) {
                console.log(err)
            } finally {
                setHasLoaded(true);
            }
        };

        handleMount();
    }, [id]);


    return (
        <Container>
            {hasLoaded ? (
            <>
                <Row>
                    <Col>
                        <CourseDetail {...course.results[0]} setCourses={setCourse}/>
                    </Col>
                </Row>
                {course.results[0].is_owner && (
                    <Row>
                        <Col>
                            <Button onClick={handelShowModal}>Edit course</Button>    
                        </Col>
                    </Row>
                )}
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
                <Modal show={showEditModal} onHide={handleHideModal}>
                    <CourseEditForm 
                        onHide={handleHideModal}
                        refreshCourse={reFetchCourseData}
                        {...course.results[0]}
                    />
                </Modal>
            </>
            ) : (
                <Row>
                    <Col className='mt-5'>
                        <Asset spinner/>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default CoursePage