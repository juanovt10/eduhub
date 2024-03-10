import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Container, Modal, Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import CourseDetail from './CourseDetail';
import ReviewCreateForm from '../reviews/ReviewCreateForm';
import { useCurrentUser } from '../../context/CurrentUserContext';
import ReviewCard from '../reviews/ReviewCard';
import Asset from '../../components/Asset';
import CourseEditForm from './CourseEditForm';
import CourseDelete from './CourseDelete';

const CoursePage = () => {  

    const { id } = useParams();
    const currentUser = useCurrentUser();
    const [course, setCourse] = useState({ results: [] });
    const [reviews, setReviews] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [showModal, setShowModal] = useState({
        showEditModal: false,
        showDeleteModal: false,
    })

    const handleModalDisplay = (modalType, bool) => {
        setShowModal((prevModals) => ({
            ...prevModals,
            [modalType]: bool,
        }));
    }

    const reFetchCourseData = async () => {
        try {
            const response = await axiosReq.get(`/courses/${id}`);
            setCourse({ results: [response.data]})
        } catch (err) {
            console.log(err)
        }
    }

    const reFetchCourseReviews = async () => {
        try {
            const response = await axiosReq.get(`/ratings/?course=${id}`)
            setReviews(response.data)
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
                            <Dropdown>
                                <Dropdown.Toggle>
                                    <i class="fa-solid fa-ellipsis"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Button onClick={() => handleModalDisplay('showEditModal', true)}>
                                            Edit course
                                        </Button>    
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button onClick={() => handleModalDisplay('showDeleteModal', true)}>
                                            Delete course
                                        </Button>    
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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
                                    fetchReviews={reFetchCourseReviews}
                                    {...review}
                                />
                            ))
                        ) : (
                            'No reviews yet'
                        )}
                    </Col>
                </Row>
                <Modal show={showModal.showEditModal} onHide={() => handleModalDisplay('showEditModal', false)}>
                    <CourseEditForm 
                        onHide={() => handleModalDisplay('showEditModal', false)}
                        refreshCourse={reFetchCourseData}
                        {...course.results[0]}
                        />
                </Modal>
                <Modal show={showModal.showDeleteModal} onHide={() => handleModalDisplay('showDeleteModal', false)}>
                    <CourseDelete 
                        onHide={() => handleModalDisplay('showDeleteModal', false)}
                        id={course.results[0].id}
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