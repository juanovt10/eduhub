import React, { useEffect, useState } from 'react'
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Asset from '../../components/Asset';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import styles from "../../styles/CourseActions.module.css";

const CourseActions = (id) => {

    const [startLoadingEnroll, setStartLoadingEnroll] = useState(false);
    const [startLoadingWishList, setStartLoadingWishList] = useState(false);
    const [courseEnrollments, setCourseEnrollments] = useState([]);
    const [courseWishList, setCourseWishList] = useState([]);

    const courseId = id.id;
    const currentUser = useCurrentUser();

    const fetchActionsData = async () => { 
        try {
            const [enrollmentResponse, wishListResponse] = await Promise.all([
                axiosReq.get(`/enrollments/`),
                axiosReq.get(`/wish_lists/`)
            ]);
            setCourseEnrollments(enrollmentResponse.data.results.filter(
                enrollment => enrollment.course === courseId
            ));
            setCourseWishList(wishListResponse.data.results.filter(
                wishList => wishList.course === courseId
            ));

        } catch (err) {
            console.log(err)
        };
    };

    const handleEnrollment = async () => {
        setStartLoadingEnroll(true);
        try {
            const response = await axiosRes.post('/enrollments/', {
                course: courseId,
            });
            if (response.status === 200 || response.status === 201) {
                fetchActionsData();
            };
        } catch(err) {
            console.log(err.response.data)
        };       
    };

    const handleWishList = async () => {
        setStartLoadingWishList(true);
        try {
            const response = await axiosRes.post('/wish_lists/', {
                course: courseId,
            });

            if (response.status === 200 || response.status === 201) {
                fetchActionsData();
            };
        } catch(err) {
            console.log(err)
        };
    };

    useEffect(() => {
        fetchActionsData();
    }, [courseEnrollments, courseWishList]);

    const isCurrentUserEnrolled = courseEnrollments.some(enrollment => enrollment.owner === currentUser.username);
    const currentUserWishListed = courseWishList.some(wishList => wishList.owner === currentUser.username);

    return (
        <Row className={styles.courseActionsContainer}>
            <Col xs={12} sm={6} className='mb-3 m-md-0 d-flex aling-items-center justify-content-center'>
                {!currentUserWishListed && !isCurrentUserEnrolled && (
                    <Card className={styles.Card}>
                    <Card.Body>
                        <Card.Title>Save it for later!</Card.Title>
                        <Button className={styles.buttonSecondary} onClick={handleWishList}>
                            {!startLoadingWishList ? (
                                <>
                                    Add to wish list <i class="fa-solid fa-heart"></i>+                                
                                </>
                            ) : (
                                <Asset spinner size='sm'/>
                            )}
                        </Button>
                    </Card.Body>
                </Card>
                )}
            </Col>
            <Col xs={12} sm={6} className='mb-3 m-md-0 d-flex aling-items-center justify-content-center'>
                {!isCurrentUserEnrolled && (
                <Card className={styles.Card}>
                    <Card.Body>
                        <Card.Title>Start learning now!</Card.Title>
                        <Button className={styles.buttonPrimary} onClick={handleEnrollment}>
                            {!startLoadingEnroll ? (
                                <>
                                    Enroll <i class="fa-solid fa-graduation-cap"></i>
                                </>
                            ) : (
                                <Asset spinner size='sm'/>
                            )}
                        </Button>
                    </Card.Body>
                </Card>
                )}
            </Col>
        </Row>
    )
}

export default CourseActions