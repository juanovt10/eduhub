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

    console.log(profileReviews.results)

    return (
        <Container className='mt-5'>
            <Row>
                <Col md={6}>
                    <Profile fetchProfileData={fetchProfileData} {...profileData} />      
                </Col>
                <Col md={6}>
                    <Nav fill variant="tabs" defaultActiveKey="/home" className='mb-2'>
                        <Nav.Item>
                            <Nav.Link onClick={handleEnrollFilter}><i class="fa-solid fa-graduation-cap"></i> Enrolled courses</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={handleWishListFilter}><i class="fa-solid fa-heart"></i> Wish List</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <CoursesDisplay filters={profileCoursesFilter} sortKey={'default'}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    {profileReviews.results?.length ? (
                        <>
                            <h3>Your reviews</h3>
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
                        <p>No reviews yet</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage