import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import { fetchMoreData } from '../../utils/utils';
import Profile from './Profile';
import CoursesDisplay from '../courses/CoursesDisplay';
import Review from '../reviews/Review';
import Asset from '../../components/Asset';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styles from '../../styles/ProfilePage.module.css';
import NotFound from '../../components/NotFound';


const ProfilePage = () => {
    const { id } = useParams();

    const [profileData, setProfileData] = useState({});
    const [profileReviews, setProfileReviews] = useState({});
    const [profileCoursesFilter, setProfileCoursesFilter] = useState({enrolled: true});
    const [profileLoader, setProfileLoader] = useState(false);
    const [moreReviewsHasLoaded, setMoreReviewsHasLoaded] = useState(false);
    const [notFound, setNotFound] = useState(false);


    const fetchProfileReviews = async () => {
        try {
            const reviewsResponse = await axiosReq.get(`/ratings/?owner=${id}`);
            const profileReviews = reviewsResponse.data;
            setProfileReviews(profileReviews);
        } catch (err) {

        };
    };

    const fetchProfileData = async () => {
        setProfileLoader(true);
        try {
            const profileResponse = await axiosReq.get(`/profiles/${id}`);
            setProfileData(profileResponse.data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setNotFound(true)
            }
        } finally {
            setProfileLoader(false);
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchProfileData(),
                    fetchProfileReviews(),
                ]);
            } catch (err) {

            };
        };

        fetchData();
    }, [id]);

    const handleEnrollFilter = () => {
        setProfileCoursesFilter({
            enrolled: true,
        });
    };

    const handleWishListFilter = () => {
        setProfileCoursesFilter({
            wish_listed: true,
        });
    };

    const handleReviewFilter = () => {
        setProfileCoursesFilter({
            wish_listed: false,
            enrolled: false, 
            owner_username: '',
        });
    };

    const handleIsOwnerFilter = () => {
        setProfileCoursesFilter({
            owner_username: profileData.owner,
        });
    };

    if (notFound) {
        return (
            <div>
                <NotFound />
            </div>
        )
    }


    return (
        <Container className={styles.mainContainer}>
            {!profileLoader ? (

                <Row>
                    <Col xs={12} className='d-flex mb-3 justify-contents-center align-items-center'>
                            <Profile fetchProfileData={fetchProfileData} {...profileData} />      
                    </Col>
                    {profileData.is_owner ? (
                        <Col lg={12}>
                            <Nav fill variant="tabs" defaultActiveKey="/home" className={`mb-2 ${styles.tabContainer}`}>
                                {profileData.is_instructor && (
                                    <Nav.Item className={profileCoursesFilter.owner_username ? styles.activeLink : styles.inactiveLink}>
                                        <Nav.Link onClick={handleIsOwnerFilter}><i class="fa-solid fa-person-chalkboard"></i> Your courses</Nav.Link>
                                    </Nav.Item>
                                )}
                                <Nav.Item className={profileCoursesFilter.enrolled ? styles.activeLink : styles.inactiveLink}>
                                    <Nav.Link onClick={handleEnrollFilter}>
                                        <i class="fa-solid fa-graduation-cap"></i> Enrolled courses
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className={profileCoursesFilter.wish_listed ? styles.activeLink : styles.inactiveLink}>
                                    <Nav.Link onClick={handleWishListFilter}>
                                        <i class="fa-solid fa-heart"></i> Wish List
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className={!profileCoursesFilter.wish_listed && !profileCoursesFilter.enrolled && !profileCoursesFilter.owner_username ? styles.activeLink : styles.inactiveLink}>
                                    <Nav.Link onClick={handleReviewFilter}>
                                        <i class="fa-solid fa-star"></i> Reviews
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            {profileCoursesFilter.wish_listed || profileCoursesFilter.enrolled || profileCoursesFilter.owner_username  ? (
                                <CoursesDisplay filters={profileCoursesFilter} sortKey={'default'}/>                        
                            ) : profileReviews.results?.length ? (
                                <>
                                    {profileReviews.results.map((review) => (
                                        <Review
                                            key={review.id}
                                            fetchReviews={fetchProfileReviews}
                                            profile
                                            {...review}
                                        />
                                    ))}
                                    {profileReviews.next && (
                                        <div className='my-5 d-flex justify-content-center align-items-center'>
                                            <Button
                                                onClick={() => fetchMoreData(profileReviews, setProfileReviews,
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
                                <h3>No reviews yet</h3>
                            )}
                        </Col>
                    ) : profileData.is_instructor && (
                        <>
                            <h3 className='mt-3'>{profileData.owner}'s courses</h3>
                            <CoursesDisplay filters={{owner_username: profileData.owner}} sortKey={'default'}/>                  
                        </>
                    )}
                </Row>
            ) : (
                <Row>
                    <Col className='mt-5'>
                        <Asset spinner />
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default ProfilePage