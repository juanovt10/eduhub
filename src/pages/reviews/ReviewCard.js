import React from 'react'; 
import { Card } from 'react-bootstrap';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Rating from '../../components/Rating';
import Avatar from '../../components/Avatar';

const ReviewCard = (props) => {

    const {
        title,
        owner,
        rating,
        profile_image,
        content,
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{content}</Card.Text>
                <Rating rating={rating} ratings_count={0}/>
                <Avatar 
                    src={profile_image}
                    text="Profile"
                    height={40}
                />
                {owner}
            </Card.Body>
        </Card>
    )
}

export default ReviewCard