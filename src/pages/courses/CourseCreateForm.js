import axios from 'axios';
import React, { useEffect, useState } from 'react'; 
import { Form } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


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
        videoHours,
        testCount,
        articleCount,
    } = courseData;

    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://eduhub-drf-api-8e84adf897cc.herokuapp.com/course-categories/');
                setCategories(response.data);
                console.log(response.data)
            } catch(err) {
                console.log(err)
            }
        };

        fetchCategories();
    }, []);

    return (
        <Form className='pt-5 px-5'>

            <Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        name="title"
                        value={title}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter course title" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        value={description}
                        onChange={handleChange}
                        as="textarea"
                        placeholder="Enter your course description" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Image</Form.Label>
                    <Form.File id="image-upload" accept="image/*" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridState">
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

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        name="duration"
                        value={duration}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter teh duration of your course" />
                </Form.Group>


            
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>price</Form.Label>
                    <Form.Control
                        name="price"
                        value={price}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter teh cost of your course" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Video hours</Form.Label>
                    <Form.Control
                        name="videoHours"
                        value={videoHours}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter the amount of video hours" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Tests</Form.Label>
                    <Form.Control
                        name="testCount"
                        value={testCount}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter the amount of tests" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Articles</Form.Label>
                    <Form.Control
                        name="articleCount"
                        value={articleCount}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter the amount of articles" />
                </Form.Group>
            </Row>
        
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default CourseCreateForm;