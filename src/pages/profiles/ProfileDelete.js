import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import { useSetCurrentUser } from '../../context/CurrentUserContext'

const ProfileDelete = ({onHide, id}) => {

    const history = useHistory();
    const setCurrentUser = useSetCurrentUser();

    console.log(id)

    const handleDelete = async () => {
        try {
            await Promise.all([
                axiosRes.delete(`/profiles/${id}/`),
                axios.post('/dj-rest-auth/logout/'),
            ])
            setCurrentUser(null);
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Delete profile?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete your profile?
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={onHide}>No!!!</Button>
                <Button variant='danger' onClick={handleDelete}>Yes, Delete profile</Button>
            </Modal.Footer>
        </div>
    )
}

export default ProfileDelete