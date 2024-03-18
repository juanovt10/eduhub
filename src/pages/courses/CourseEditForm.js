import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetClose,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css'
 
const CourseEditForm = ({onHide, refreshCourse, ...props}) => {

    const [categories, setCategories] = useState({}); 
    const [courseData, setCourseData] = useState({
        ...props
    })

    const { 
        title,
        description,
        image,
        category,
        duration,
        price,
        video_hours,
        test_count,
        article_count,
        id,
    } = courseData;

    const imageInput = useRef(null);

    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value,
        })
    }

    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image);
            setCourseData({
                ...courseData,
                image: URL.createObjectURL(e.target.files[0]),
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

        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('duration', duration)
        formData.append('price', price)
        formData.append('video_hours', video_hours)
        formData.append('test_count', test_count)
        formData.append('article_count', article_count)

        if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0])
        }

        try {
            await axiosReq.put(`/courses/${id}/`, formData)
            onHide();
            refreshCourse();
            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SheetContent className={`${styles.sheetContainer} ${styles.editCourseSheetContainer}`} side={'right'}>
            <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Edit Course</SheetTitle>
            </SheetHeader>

            <Form className={styles.sheetEditCourseForm} onSubmit={handleSubmit}>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="title"
                            value={title}
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
                            value={description}
                            onChange={handleChange}
                            as="textarea"
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        {image ? (
                            <>
                                <figure>
                                    <Image src={image} rounded />
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
                            value={category}
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
                            value={duration}
                            onChange={handleChange}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>price</Form.Label>
                        <Form.Control
                            name="price"
                            value={price}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Video hours</Form.Label>
                        <Form.Control
                            name="video_hours"
                            value={video_hours}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Tests</Form.Label>
                        <Form.Control
                            name="test_count"
                            value={test_count}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Articles</Form.Label>
                        <Form.Control
                            name="article_count"
                            value={article_count}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="warning" onClick={onHide}>
                    Discard Changes
                </Button>
            </Form>
        </SheetContent>

    )
}

export default CourseEditForm