import React from 'react'
import { axiosRes } from '../../api/axiosDefaults'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { Modal, Button } from 'react-bootstrap'

const CourseDelete = ({onHide, id}) => {

    const history = useHistory();

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/courses/${id}/`)
            history.push('/courses/')
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Delete Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the course?
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={onHide}>No!!!</Button>
                <Button variant='danger' onClick={handleDelete}>Yes, Delete course</Button>
            </Modal.Footer>
        </div>
    )
}

export default CourseDelete