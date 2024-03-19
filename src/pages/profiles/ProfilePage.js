import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Profile from './Profile';
import { Col, Container, Row } from 'react-bootstrap';
import ReviewCard from '../reviews/ReviewCard';
import CoursesDisplay from '../courses/CoursesDisplay';
import Nav from 'react-bootstrap/Nav';
import Review from '../reviews/Review';


const ProfilePage = () => {
    const currentUser = useCurrentUser();
    const { id } = useParams();

    const [profileData, setProfileData] = useState({});
    const [profileReviews, setProfileReviews] = useState({});
    const [profileCoursesFilter, setProfileCoursesFilter] = useState({enrolled: true})

    const fetchProfileReviews = async () => {
        try {
            const reviewsResponse = await axiosReq.get(`/ratings/?owner=${id}`);
            const profileReviews = reviewsResponse.data
            setProfileReviews(profileReviews)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchProfileData = async () => {
        try {
            const profileResponse = await axiosReq.get(`/profiles/${id}`)
            setProfileData(profileResponse.data)
        } catch (err) {
            
        }
    }

    console.log(profileData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchProfileData(),
                    fetchProfileReviews(),
                ])
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [id])

    const handleEnrollFilter = () => {
        setProfileCoursesFilter({
            enrolled: true,
        })
    }

    const handleWishListFilter = () => {
        setProfileCoursesFilter({
            wish_listed: true,
        })
    }

    const handleReviewFilter = () => {
        setProfileCoursesFilter({
            wish_listed: false,
            enrolled: false
        })
    }

    console.log(profileReviews.results)
    console.log(currentUser)

    return (
        <Container className='mt-5'>
            <Row>
                <Col lg={profileData.is_owner ? 5 : 12} className='d-flex mb-3 justify-content-center'>
                    <Profile fetchProfileData={fetchProfileData} {...profileData} />      
                </Col>
                {profileData.is_owner && (
                    <Col lg={7}>
                        <Nav fill variant="tabs" defaultActiveKey="/home" className='mb-2'>
                            <Nav.Item>
                                <Nav.Link onClick={handleEnrollFilter}><i class="fa-solid fa-graduation-cap"></i> Enrolled courses</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={handleWishListFilter}><i class="fa-solid fa-heart"></i> Wish List</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={handleReviewFilter}><i class="fa-solid fa-star"></i> Reviews</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        {profileCoursesFilter.wish_listed || profileCoursesFilter.enrolled ? (
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
                                </>
                            ) : (
                                <h3>No reviews yet</h3>
                        )}
                </Col>
                )}
            </Row>
        </Container>
    )
}

export default ProfilePage