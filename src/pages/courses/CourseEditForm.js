import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';
 
const CourseEditForm = (props) => {

    const [categories, setCategories] = useState({}); 
    const [courseData, setCourseData] = useState({
        ...props
    })

    const imageInput = useRef(null);
    const history = useHistory();

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
                image: courseData.image,
            })
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://eduhub-drf-api-8e84adf897cc.herokuapp.com/course-categories/');
                setCategories(response.data);
            } catch(err) {
                console.log(err)
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        console.log('trigger submit')

        formData.append('title', courseData.title)
        formData.append('description', courseData.description)
        formData.append('image', imageInput.current.files[0])
        formData.append('category', courseData.category)
        formData.append('duration', courseData.duration)
        formData.append('price', courseData.price)
        formData.append('video_hours', courseData.video_hours)
        formData.append('test_count', courseData.test_count)
        formData.append('article_count', courseData.article_ount)

        if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0])
        }

        try {
            await axiosReq.put(`/courses/${courseData.id}/`, formData)
            history.push(`/courses/${courseData.id}`)
            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                name="title"
                                value={courseData.title}
                                onChange={handleChange}
                                type="text"
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                value={courseData.description}
                                onChange={handleChange}
                                as="textarea"
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            {courseData.image ? (
                                <>
                                    <figure>
                                        <Image src={courseData.image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label>Change image</Form.Label>
                                    </div>
                                </>

                            ) : (
                                <Form.Label>Image</Form.Label>
                            )}
                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                defaultValue=""
                                name="category"
                                value={courseData.category}
                                onChange={handleChange}
                            >
                                {Array.isArray(categories) && categories.map((cat, idx) => (
                                    <option key={idx} value={cat.key}>{cat.value}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                name="duration"
                                value={courseData.duration}
                                onChange={handleChange}
                                type="text"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>price</Form.Label>
                            <Form.Control
                                name="price"
                                value={courseData.price}
                                onChange={handleChange}
                                type="number"
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Video hours</Form.Label>
                            <Form.Control
                                name="videoHours"
                                value={courseData.video_hours}
                                onChange={handleChange}
                                type="number"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Tests</Form.Label>
                            <Form.Control
                                name="testCount"
                                value={courseData.test_count}
                                onChange={handleChange}
                                type="number"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Articles</Form.Label>
                            <Form.Control
                                name="articleCount"
                                value={courseData.article_count}
                                onChange={handleChange}
                                type="number"
                            />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </div>
    )
}

export default CourseEditForm