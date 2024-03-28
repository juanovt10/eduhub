import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ReviewCreateForm from '../reviews/ReviewCreateForm';
import Asset from '../../components/Asset';
import CourseEditForm from './CourseEditForm';
import CourseDelete from './CourseDelete';
import ReviewsOverview from '../reviews/ReviewsOverview';
import Rating from '../../components/Rating';
import Review from '../reviews/Review';
import CourseActions from './CourseActions';
import Dropdown from '../../components/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import { Sheet } from "../../@/components/ui/sheet";
import styles from "../../styles/CoursePage.module.css";
import { fetchMoreData } from '../../utils/utils';
import { Button } from 'react-bootstrap';


const CoursePage = () => {  

    const { id } = useParams();
    const currentUser = useCurrentUser();
    const [course, setCourse] = useState({ results: [] });
    const [reviews, setReviews] = useState({ results: [] });
    const [reviewsOverview, setReviewsOverview] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [moreReviewsHasLoaded, setMoreReviewsHasLoaded] = useState(false);
    const [ownerAlert, setOwnerAlert] =  useState(true);
    const [showSheet, setShowSheet] = useState({
        showEditSheet: false,
        showDeleteSheet: false
    });

    const handleSheetDisplay = (sheetType, bool) => {
        setShowSheet((prevSheet) => ({
            ...prevSheet,
            [sheetType]: bool,
        }));
    };

    const reFetchCourseData = async () => {
        try {
            const response = await axiosReq.get(`/courses/${id}`);
            setCourse({ results: [response.data]});
        } catch (err) {
            console.log(err);
        };
    };

    const reFetchCourseReviews = async () => {
        try {
            const response = await axiosReq.get(`/ratings/?course=${id}`);
            setReviews(response.data);
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        const handleMount = async () => {
            try {
                    const [
                        courseResponse,
                        reviewsResponse,
                        reviewsOverviewResponse
                    ] = await Promise.all([
                    axiosReq.get(`/courses/${id}`),
                    axiosReq.get(`/ratings/?course=${id}`),
                    axiosReq.get(`/ratings/stats/${id}`)
                ]);
                const courseData = courseResponse.data;
                const reviewsData = reviewsResponse.data;
                const reviewsOverviewData = reviewsOverviewResponse.data;
                setCourse({ results: [courseData]});
                setReviews(reviewsData);
                setReviewsOverview(reviewsOverviewData)
            } catch(err) {
                console.log(err);
            } finally {
                setHasLoaded(true);
            };
        };

        handleMount();
    }, [id]);

    const courseData = course.results[0];
    console.log(courseData)

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
                <Row className='justify-content-between'>
                    <Col xs={12} md={7} className='d-flex flex-column justify-content-center w-100'>
                        {courseData.is_owner && (
                            <div className={styles.editCourseDropdown}>
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
                                    <CourseDelete id={courseData.id} />
                                </Sheet>
                            </div>
                        )}
                        <div>
                            <h2 className='text-center'>{courseData.title}</h2>
                            <p className='text-justify'>{courseData.description}</p>
                        </div>
                    </Col>
                    <Col xs={12} md={5} className='d-flex justify-content-center align-items-center'>
                        <figure className='m-0' >
                            <Image 
                                src={courseData.image}
                                className={styles.image}
                                fluid
                            />
                        </figure>
                    </Col>
                </Row>

                <Row className='my-3'>
                    <span className={styles.courseOwner}>
                        Created by: <Link className={styles.ownerLink} to={`/profiles/${courseData.profile_id}`}>{courseData.owner}</Link>
                    </span>
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
                    {currentUser && !courseData.is_owner && (
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
                        <ReviewsOverview reviewsOverview={reviewsOverview} totalReviews={course.results[0].ratings_count} courseId={course.results[0].id} />
                    </Col>
                    <Col md={12} lg={7}>
                        {currentUser && (
                            !courseData.rating_id && (
                                !courseData.is_owner && (
                                    <ReviewCreateForm
                                        course={id}
                                        setCourse={setCourse}
                                        setReviews={setReviews}
                                    />   
                                )
                            )
                        )}

                        {reviews.results?.length ? (
                            <>
                                {reviews.results.map((review) => (
                                    <Review
                                        key={review.id}
                                        fetchReviews={reFetchCourseReviews}
                                        setCourse={setCourse}
                                        setReviews={setReviews}
                                        {...review}
                                    />
                                ))}
                                {reviews.next && (
                                    <div className='my-5 d-flex justify-content-center align-items-center'>
                                        <Button 
                                            onClick={() => fetchMoreData(reviews, setReviews,
                                                () => setMoreReviewsHasLoaded(true),
                                                () => setMoreReviewsHasLoaded(false))}
                                            className={`${styles.buttonPrimary}`}
                                        >
                                            {!moreReviewsHasLoaded ? (
                                               'Load more reviews'
                                            ) : (
                                                <Asset spinner size='sm' />
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className={`my-4 ${styles.noReviewsDiv}`}>
                                <p className='m-0'>No reviews yet</p>
                            </div>
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