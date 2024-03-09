import React, { useEffect, useState } from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
 
const CourseEditForm = (props) => {

    const [courseData, setCourseData] = useState({
        ...props
    })

    console.log(courseData)

    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value,
        })
    }


    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(courseData.image);
            setCourseData({
                ...courseData,
                image: URL(e.target.files[0]),
            })
        }
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </div>
    )
}

export default CourseEditForm