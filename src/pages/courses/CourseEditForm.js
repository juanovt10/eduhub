import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/EditCourse.module.css'
 
const CourseEditForm = ({onHide, refreshCourse, ...props}) => {

    const [categories, setCategories] = useState({}); 
    const [errors, setErrors] = useState({});
    const [startedLoading, setStartedLoading] = useState(false);
    const [courseData, setCourseData] = useState({
        ...props
    });

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
        });
    };

    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image);
            setCourseData({
                ...courseData,
                image: URL.createObjectURL(e.target.files[0]),
            });
        };
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://eduhub-drf-api-8e84adf897cc.herokuapp.com/course-categories/');
                setCategories(response.data);
            } catch(err) {

            };
        };

        fetchCategories();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStartedLoading(true);
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('duration', duration);
        formData.append('price', price);
        formData.append('video_hours', video_hours);
        formData.append('test_count', test_count);
        formData.append('article_count', article_count);

        if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0]);
        };

        try {
            await axiosReq.put(`/courses/${id}/`, formData);
            onHide();
            refreshCourse();
            
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
        } finally {
            setStartedLoading(false);
        };
    };

    return (
        <SheetContent className={`${styles.sheetContainer} ${styles.editCourseSheetContainer}`} side={'left'}>
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
                    {errors.title?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </Row>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            value={description}
                            onChange={handleChange}
                            as="textarea"
                            rows={4}
                        />
                    </Form.Group>
                    {errors.description?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </Row>

                <Row>
                    <Form.Group as={Col}>
                        {image ? (
                            <>
                                <figure>
                                    <Image src={image} className={styles.image} rounded />
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
                    {errors.image?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </Row>

                <Row>
                    <Form.Group as={Col} xs={12} sm={6}>
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
                    {errors.category?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group as={Col} xs={12} sm={6}>
                        <Form.Label>price</Form.Label>
                        <Form.Control
                            name="price"
                            value={price}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>
                    {errors.price?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </Row>

                <Row>
                    <Form.Group as={Col} xs={12} sm={4}>
                        <Form.Label>Video hours</Form.Label>
                        <Form.Control
                            name="video_hours"
                            value={video_hours}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>
                    {errors.videoHours?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group as={Col} xs={12} sm={4}>
                        <Form.Label>Tests</Form.Label>
                        <Form.Control
                            name="test_count"
                            value={test_count}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>
                    {errors.testCount?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group as={Col} xs={12} sm={4}>
                        <Form.Label>Articles</Form.Label>
                        <Form.Control
                            name="article_count"
                            value={article_count}
                            onChange={handleChange}
                            type="number"
                        />
                    </Form.Group>
                    {errors.articleCount?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </Row>

                <div className='d-flex mt-3 justify-content-center'>
                    <Button 
                        className={`mr-3 ${styles.buttonSecondary}`}
                        onClick={onHide}   
                        type='reset' 
                    >
                        Discard changes
                    </Button>
                    <Button className={styles.buttonPrimary} type="submit">
                        {!startedLoading ? (
                            'Edit course'
                        ) : (
                            <Asset spinner size='sm' />
                        )}
                    </Button>
                </div>
            </Form>
        </SheetContent>
    )
}

export default CourseEditForm