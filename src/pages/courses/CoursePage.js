import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Container, Modal, ButtonGroup, Image, Alert, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
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
import styles from "../../styles/CoursePage.module.css";


const CoursePage = () => {  

    const { id } = useParams();
    const currentUser = useCurrentUser();
    const [course, setCourse] = useState({ results: [] });
    const [reviews, setReviews] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [ownerAlert, setOwnerAlert] =  useState(true);
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
    }, [course]);

    console.log(course.results[0])
    console.log(currentUser)

    const courseData = course.results[0]


    return (
        <Container className={styles.mainContainer}>
            {hasLoaded ? (
                <>
                    {currentUser && courseData.is_owner && ownerAlert ? (
                        <Alert variant='warning' onClose={() => setOwnerAlert(false)} dismissible>
                            You are the owner of this course, you can{" "}
                            <Alert.Link
                                onClick={() => {
                                    handleSheetDisplay('showEditSheet', true);
                                    setOwnerAlert(false);
                                }}
                            >
                                edit
                            </Alert.Link>
                            {" "}or{" "}  
                            <Alert.Link
                                onClick={() => {
                                    handleSheetDisplay('showDeleteSheet', true);
                                    setOwnerAlert(false);
                                }}
                            >
                                delete
                            </Alert.Link>
                            {" "}the course, but you cannot leave a review, enroll or add it to your wish list.
                        </Alert>
                    ) : !currentUser && (
                        <Alert variant='danger' onClose={() => setOwnerAlert(false)} dismissible>
                            To enroll, add to wish list or leave a review please{" "}
                            <Alert.Link as={Link} to='/auth'>
                                signin.
                            </Alert.Link>       
                        </Alert>
                    )}
                <Row>
                    <Col xs={11} md={6} className='d-flex flex-column justify-content-center align-items-center'>
                        <h2>{courseData.title}</h2>
                        <p>{courseData.description}</p>
                    </Col>
                    <Col className='d-none d-md-block' md={5}>
                        <div className={styles.imageWrapper}>
                            <Image src={courseData.image} fluid/>
                        </div>
                    </Col>
                    <Col xs={1} md={1}>
                        {courseData.is_owner && (
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
                    </Col>
                </Row>

                <Row className='my-3'>
                    <span className={styles.courseOwner}>Created by: {courseData.owner}</span>
                </Row>

                <Row className={`mb-5 ${styles.courseInfoContainer}`}>

                    {courseData.video_hours > 0 && (
                        <Col className='d-flex align-items-center'>
                            <div className={`mr-2 ${styles.courseDataIcon}`}>
                                <i class="fa-solid fa-video"></i> 
                            </div>
                            <div className={styles.courseDataItem}>
                                <p>{courseData.video_hours}</p>
                                <p>video {courseData.video_hours > 1 ? "hours" : "hour"}</p>
                            </div>
                        </Col>
                    )}

                    {courseData.article_count > 0 && (
                        <Col className='d-flex align-items-center'>
                            <div className={`mr-2 ${styles.courseDataIcon}`}>
                                <i class="fa-brands fa-readme"></i>
                            </div>
                            <div className={styles.courseDataItem}>
                                <p>{courseData.article_count}</p>
                                <p>{courseData.article_count > 1 ? "articles" : "article"}</p>
                            </div>
                        </Col>
                    )}


                    {courseData.test_count > 0 && (
                        <Col className='d-flex align-items-center'>
                            <div className={`mr-2 ${styles.courseDataIcon}`}>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className={styles.courseDataItem}>
                                <p>{courseData.test_count}</p>
                                <p>{courseData.test_count > 1 ? "tests" : "test"}</p>
                            </div>
                        </Col>
                    )}

                    <Col className='d-flex align-items-center'>
                        <div className={`mr-2 ${styles.courseDataIcon}`}>
                            <i class="fa-solid fa-euro-sign"></i>
                        </div>
                        <span>{courseData.price}</span>
                    </Col>
                </Row>

                <div className='mb-5'>
                    {!currentUser ? (
                        <Card className={styles.Card}>
                            <Card.Body>
                                <p>Regsiter o enroll, add to wish list or leave a review for this course</p>
                                <Button><Link to='/auth'>Sign Up</Link></Button> 
                            </Card.Body>
                        </Card>
                    ) : !courseData.is_owner && (
                        <CourseActions id={courseData.id}/>
                    )}
                </div>

                <Row>
                    <h4 className='m-0'>Reviews</h4>
                    <div className='d-flex my-2'>
                        <Rating rating={course.results[0].overall_rating}/>
                        <span className='ml-2'>{course.results[0].ratings_count} reviews</span>        
                    </div>
                </Row>
                <Row>
                    <Col md={12} lg={5} className='mb-5'>
                        <ReviewsOverview reviews={reviews.results} {...course.results[0]}/>
                    </Col>
                    <Col md={12} lg={7}>
                        {currentUser && (
                            !courseData.rating_id  && (
                                <ReviewCreateForm
                                    course={id}
                                    setCourse={setCourse}
                                    setReviews={setReviews}
                                />   
                            )
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
            </>
            ) : (
                <Row className={styles.loaderContainer}>
                    <Col className='mt-5'>
                        <Asset spinner/>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default CoursePage