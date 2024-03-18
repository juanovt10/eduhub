import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Container, Modal, ButtonGroup, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import CourseDetail from './CourseDetail';
import ReviewCreateForm from '../reviews/ReviewCreateForm';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Asset from '../../components/Asset';
import CourseEditForm from './CourseEditForm';
import CourseDelete from './CourseDelete';
import ReviewsOverview from '../reviews/ReviewsOverview';
import Rating from '../../components/Rating';
import Review from '../reviews/Review';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CourseActions from './CourseActions';
import Dropdown from '../../components/Dropdown';
import { Sheet } from "../../@/components/ui/sheet";

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
    const [showSheet, setShowSheet] = useState({
        showEditSheet: false,
        showDeleteSheet: false
    })

    const handleSheetDisplay = (sheetType, bool) => {
        setShowSheet((prevSheet) => ({
            ...prevSheet,
            [sheetType]: bool,
        }))
    }

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

    console.log(course.results[0])

    const courseData = course.results[0]

    return (
        <Container className='mt-5'>
            {hasLoaded ? (
            <>
                <Row>
                    <Col md={6} className='d-flex flex-column justify-content-center align-items-center'>
                        <h2>{courseData.title}</h2>
                        <p>{courseData.title}</p>
                    </Col>
                    <Col md={5}>
                        <Image src={courseData.image} fluid/>
                    </Col>
                    <Col md={1}>
                        {course.results[0].is_owner && (
                            <>
                                <Dropdown 
                                    handleSelect={handleSheetDisplay}
                                    actionTypes={['showEditSheet', 'showDeleteSheet']}
                                    entity='course'
                                />

                                <Sheet open={showSheet.showEditSheet} onOpenChange={setShowSheet}>
                                    <CourseEditForm 
                                        onHide={() => handleSheetDisplay('showEditSheet', false)}
                                        refreshCourse={reFetchCourseData}
                                        {...courseData}
                                    />
                                </Sheet>
                                <Sheet open={showSheet.showDeleteSheet} onOpenChange={setShowSheet}>
                                    <CourseDelete 
                                        onHide={() => handleSheetDisplay('showDeleteSheet', false)}
                                        id={courseData.id}
                                    />
                                </Sheet>
                            
                            </>
                        )}


                        {/* <CourseActions courseId={courseData.id}/> */}
                    </Col>
                </Row>

            
                <h4 className='m-0'>Reviews</h4>
                <div className='d-flex my-2'>
                    <Rating rating={course.results[0].overall_rating}/>
                    <span className='ml-2'>{course.results[0].ratings_count} reviews</span>        
                </div>
                <Row>
                    <Col md={4} lg={5} className='mb-5'>
                        <ReviewsOverview reviews={reviews.results} {...course.results[0]}/>
                    </Col>
                    <Col md={8} lg={7}>
                        {currentUser ? (
                            !courseData.rating_id && (
                                <ReviewCreateForm
                                    course={id}
                                    setCourse={setCourse}
                                    setReviews={setReviews}
                                />   
                            )
                        ) : (
                            <div className='ml-3'>
                                <h5>To leave a review you must sign in</h5>
                                <Button><Link to='/auth'>Sign Up</Link></Button>  
                            </div>
                        )}
                        {reviews.results?.length ? (
                            reviews.results.map((review) => (
                                <Review
                                    key={review.id}
                                    fetchReviews={reFetchCourseReviews}
                                    setCourse={setCourse}
                                    setReviews={setReviews}
                                    {...review}
                                />
                            ))
                        ) : (
                            'No reviews yet'
                        )}
                    </Col>
                </Row>





                {/* <Modal show={showModal.showEditModal} onHide={() => handleModalDisplay('showEditModal', false)}>
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
                </Modal> */}
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