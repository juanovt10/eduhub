import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'; 
import { Form, Image } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';



const CourseCreateForm = () => {

    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState({});

    const [courseData, setCourseData] = useState({
        title:"",
        description:"",
        image:"",
        category:"",
        duration:"",
        price:"",
        videoHours:"",
        testCount:"",
        articleCount:"",
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
    } = courseData;

    const imageInput = useRef(null);
    const history = useHistory();


    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setCourseData({
                ...courseData,
                image: URL.createObjectURL(event.target.files[0]),
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', imageInput.current.files[0])
        formData.append('category', category)
        formData.append('duration', duration)
        formData.append('price', price)
        formData.append('video_hours', video_hours)
        formData.append('test_count', test_count)
        formData.append('article_count', article_count)

        try {
            const {data} = await axiosReq.post('/courses/', formData);
            history.push(`/courses/${data.id}`)
        } catch(err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://eduhub-drf-api-8e84adf897cc.herokuapp.com/course-categories/');
                setCategories(response.data);
            } catch(err) {
                setErrors(err.response?.data);
            }
        };

        fetchCategories();
    }, []);

    return (
       
        <Form className='pt-5 px-5' onSubmit={handleSubmit}>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        name="title"
                        value={title}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter course title" />
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
                        placeholder="Enter your course description" />
                </Form.Group>
                {errors.description?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
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
                {errors.image?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
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
                {errors.category?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group as={Col}>
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        name="duration"
                        value={duration}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter teh duration of your course" />
                </Form.Group>
                {errors.duration?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}


            
                <Form.Group as={Col}>
                    <Form.Label>price</Form.Label>
                    <Form.Control
                        name="price"
                        value={price}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter teh cost of your course" />
                </Form.Group>
                {errors.price?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
            </Row>

            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Video hours</Form.Label>
                    <Form.Control
                        name="videoHours"
                        value={video_hours}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter the amount of video hours" />
                </Form.Group>
                {errors.video_hours?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group as={Col}>
                    <Form.Label>Tests</Form.Label>
                    <Form.Control
                        name="testCount"
                        value={test_count}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter the amount of tests" />
                </Form.Group>
                {errors.test_count?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group as={Col}>
                    <Form.Label>Articles</Form.Label>
                    <Form.Control
                        name="articleCount"
                        value={article_count}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter the amount of articles" />
                </Form.Group>
                {errors.article_count?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
            </Row>
        
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default CourseCreateForm;