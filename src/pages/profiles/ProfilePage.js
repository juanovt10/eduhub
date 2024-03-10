import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Profile from './Profile';
import { Col, Container, Row } from 'react-bootstrap';
import ReviewCard from '../reviews/ReviewCard';
import CoursesDisplay from '../courses/CoursesDisplay';
import Nav from 'react-bootstrap/Nav';


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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileResponse] = await Promise.all([
                    axiosReq.get(`/profiles/${id}`),
                    fetchProfileReviews(),
                ])
                const profileData = profileResponse.data
                setProfileData(profileData)
                
                console.log(profileData)

                
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

    return (
        <Container className='mt-5'>
            <Row>
                <Col md={4}>
                    <Profile {...profileData} />      
                </Col>
                <Col md={8}>
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
                    {profileReviews.results?.length ?(
                        profileReviews.results.map((review) => (
                            <ReviewCard 
                                key={review.id}
                                fetchReviews={fetchProfileReviews}  
                                {...review}               
                            />
                        ))
                    ) : (
                        <p>No reviews yet</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage