import React, { useState } from 'react';
import { Card, Row, Col, Image, Dropdown, Button, Modal, ModalBody } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../context/CurrentUserContext';
import CreateProfileForm from './CreateProfileForm';


const Profile = ({fetchProfileData, ...props}) => {
    const {
        owner,
        created_at,
        name,
        bio,
        dob,
        image,
        is_instructor,
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
            <Card className='px-3 py-3'>
                <Row>
                    {is_instructor && (
                        <Col className='text-left'>
                            <i class="fa-solid fa-graduation-cap"></i>
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
                        <h4>{owner}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <h2>{name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{bio}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{dob}</p>
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
                delete modal
            </Modal>
        </>
    )
}

export default Profile