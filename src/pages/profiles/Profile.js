import React, { useState } from 'react';
import { Card, Row, Col, Image, Dropdown, Button, Modal, ModalBody } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../context/CurrentUserContext';
import CreateProfileForm from './CreateProfileForm';
import ProfileDelete from './ProfileDelete';
import styles from "../../styles/Profile.module.css";


const Profile = ({fetchProfileData, ...props}) => {
    const {
        id,
        owner,
        created_at,
        name,
        bio,
        dob,
        image,
        is_instructor,
        enrollments_count,
        ratings_count,
        wish_list_count,
    } = props

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

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    console.log(is_instructor)
    

    return (
        <>
            <Card className={`px-3 py-3 ${styles.CompactCard}`}>
                <Row>
                    {is_instructor ? (
                        <Col className='text-left'>
                            <i class="fa-solid fa-graduation-cap"></i>
                        </Col>
                    ) : (
                        <Col className='text-left'>
                            {/* Need to add functionality */}
                            <Button><i class="fa-solid fa-graduation-cap"></i></Button> 
                        </Col>
                    )}
                    {is_owner && (
                        <Col className='text-right'>
                            <Dropdown>
                                <Dropdown.Toggle>
                                    <i class="fa-solid fa-ellipsis"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Button onClick={() => handleModalDisplay('showEditModal', true)}>
                                            Edit profile
                                        </Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button onClick={() => handleModalDisplay('showDeleteModal', true)}>
                                            Delete profile
                                        </Button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    )}
                </Row>
                <Row className='my-3'>
                    <Avatar
                        src={image}
                        height={70}
                        text={`@${owner}`}
                    />
                </Row>
                <Row>
                    <Col className='text-center'>
                        <h4>{name}</h4>
                    </Col>
                </Row>

                <div className={`my-3 ${styles.dataContainer}`}>
                    <div>
                        <strong>{enrollments_count}</strong>
                        <strong>Enrollments</strong>
                    </div>

                    <div>
                        <strong>{ratings_count}</strong>
                        <strong>Reviews</strong>
                    </div>
                    <div>
                        <strong>{wish_list_count}</strong>
                        <strong>Wish List</strong>
                    </div>
                </div>

                <Row>
                    <Col>
                        {/* <p>{bio}</p> */}
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut tellus. Pharetra sit amet aliquam id. Dictum non consectetur a erat. Pulvinar mattis nunc sed blandit libero.</p>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        Joined Eduhub on: {created_at}
                    </Col>
                </Row>
            </Card>


            <Modal show={showModal.showEditModal} onHide={() => handleModalDisplay('showEditModal', false)}>
                <Modal.Header>
                    <Modal.Title>Edit profile? {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateProfileForm
                        mode='edit'
                        fetchProfileData={fetchProfileData}
                        onHide={() => handleModalDisplay('showEditModal', false)}
                    />
                </Modal.Body>
            </Modal>
            <Modal show={showModal.showDeleteModal} onHide={() => handleModalDisplay('showDeleteModal', false)}>
               <ProfileDelete
                    onHide={() => handleModalDisplay('showDeleteModal', false)}
                    id={id}
                />
            </Modal>
        </>
    )
}

export default Profile