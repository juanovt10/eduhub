import React, { useState } from 'react'; 
import { Card, Modal } from 'react-bootstrap';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Rating from '../../components/Rating';
import Avatar from '../../components/Avatar';
import ReviewEditForm from './ReviewEditForm';

const ReviewCard = ({fetchReviews, ...props}) => {

    const [showEditModal, setShowEditModal] = useState(false);

    const {
        id,
        title,
        owner,
        rating,
        profile_image,
        content,
    } = props

    const handelShowModal = () => setShowEditModal(true)
    const handleHideModal = () => setShowEditModal(false)

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;


    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    {is_owner && (
                        <button onClick={handelShowModal}>
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                    )}
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{content}</Card.Text>
                    <Rating rating={rating} />
                    <Avatar 
                        src={profile_image}
                        text="Profile"
                        height={40}
                    />
                    {owner}
                </Card.Body>
            </Card>
            <Modal show={showEditModal} onHide={handleHideModal}>
                <ReviewEditForm onHide={handleHideModal} fetchReviews={fetchReviews} {...props} />
            </Modal>
        </>
    )
}

export default ReviewCard