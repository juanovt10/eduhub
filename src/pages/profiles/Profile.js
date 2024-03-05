import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../context/CurrentUserContext';


const Profile = (props) => {
    const {
        owner,
        created_at,
        name,
        bio,
        dob,
        image,
        is_instructor,
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    console.log(is_instructor)
    



    return (

        <Card className='px-3 py-3'>
            <Row>
                {is_instructor && (
                <Col className='text-left'>
                    <i class="fa-solid fa-graduation-cap"></i>
                </Col>
                )}
                {is_owner && (
                <Col className='text-right'>
                    <i class="fa-solid fa-ellipsis"></i>
                </Col>
                )}
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
                <Col>
                    <Avatar 
                        src={image}
                        height={100}
                    />
                </Col>
                <Col>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col className='text-center'>
                    <h2>{owner}</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    John Doe is a tech enthusiast with a strong background in software development
                    and a passion for innovation. In his free time, he explores new technologies,
                    enjoys outdoor activities, and engages in creative photography. {bio}
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    Joined Eduhub on: {created_at}
                </Col>
            </Row>
        </Card>
    )
}

export default Profile