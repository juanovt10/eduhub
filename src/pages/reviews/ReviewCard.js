import React, { useState } from 'react'; 
import { Card, Modal, Dropdown, Button} from 'react-bootstrap';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Rating from '../../components/Rating';
import Avatar from '../../components/Avatar';
import ReviewEditForm from './ReviewEditForm';
import ReviewDelete from './ReviewDelete';

const ReviewCard = ({fetchReviews, setCourse, setReviews, ...props}) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showModal, setShowModal] = useState({
        showEditModal: false,
        showDeleteModal: false,
    })

    const handleModalDisplay = (modalType, bool) => {
        setShowModal((prevModals) => ({
            ...prevModals,
            [modalType]: bool,
        }));
    }

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
                        <Dropdown>
                                <Dropdown.Toggle>
                                    <i class="fa-solid fa-ellipsis"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Button onClick={() => handleModalDisplay('showEditModal', true)}>
                                            Edit review
                                        </Button>    
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button onClick={() => handleModalDisplay('showDeleteModal', true)}>
                                            Delete review
                                        </Button>    
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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
            <Modal show={showModal.showEditModal} onHide={() => handleModalDisplay('showEditModal', false)}>
                <ReviewEditForm onHide={() => handleModalDisplay('showEditModal', false)} fetchReviews={fetchReviews} {...props} />
            </Modal>
            <Modal show={showModal.showDeleteModal} onHide={() => handleModalDisplay('showDeleteModal', false)}>
                <ReviewDelete 
                    onHide={() => handleModalDisplay('showDeleteModal', false)}
                    fetchReviews={fetchReviews}
                    setCourse={setCourse}
                    setReviews={setReviews}
                    id={id}/>
            </Modal>
        </>
    )
}

export default ReviewCard