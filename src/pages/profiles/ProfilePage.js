import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Profile from './Profile';
import { Col, Container, Row } from 'react-bootstrap';
import ProfileCourses from './ProfileCourses';
import ReviewCard from '../reviews/ReviewCard';


const ProfilePage = () => {
    const currentUser = useCurrentUser();
    const { id } = useParams();

    const [profileData, setProfileData] = useState({});
    const [profileReviews, setProfileReviews] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileResponse, reviewsResponse] = await Promise.all([
                    axiosReq.get(`/profiles/${id}`),
                    axiosReq.get(`/ratings/?owner=${id}`)
                ])
                const profileData = profileResponse.data
                const profileReviews = reviewsResponse.data
                setProfileData(profileData)
                setProfileReviews(profileReviews)
                console.log(profileData)
                console.log(profileReviews.results)
                
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [id])

    return (
        <Container className='mt-5'>
            <Row>
                <Col>
                    <Profile {...profileData} />      
                </Col>
                <Col>
                    <ProfileCourses /> 
                </Col>
            </Row>
            <Row>
                <Col>
                    {profileReviews.results?.length ?(
                        profileReviews.results.map((review) => (
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
                        <p>No reviews yet</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage