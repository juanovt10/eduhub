import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Profile from './Profile';
import { Col, Container, Row } from 'react-bootstrap';
import ProfileCourses from './ProfileCourses';


const ProfilePage = () => {
    const currentUser = useCurrentUser();
    const { id } = useParams();

    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileResponse] = await Promise.all([
                    axiosReq.get(`/profiles/${id}`),

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

    return (
        <Container className='mt-5'>
            <Row>
                <Col>
                    <Profile {...profileData} />      
                </Col>
                <Col>
                    <ProfileCourses /> 
                </Col>
                <Col>
                    Reviews placeholder    
                </Col>
            </Row>
        </Container>
        // <div>
        //     <Profile {...profileData.results[0]} setProfileData={setProfileData}/>
        // </div>
    )
}

export default ProfilePage