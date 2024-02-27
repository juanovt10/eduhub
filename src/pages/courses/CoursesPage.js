import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormCheck, Row } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults';
import CourseCard from './CourseCard';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import Rating from '../../components/Rating';


const CoursesPage = () => {
    const [courses, setCourses] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [categories, setCategories] = useState({});
    const [errors, setErrors] = useState({});
    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedResources, setSelectedResources] = useState({});
    const [selectedRating, setSelectedRating] = useState(0);

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;

        setSelectedCategories(prev => {
            if (checked) {
                return [...prev, value]
            } else {
                return prev.filter(category => category !== value)
            }
        })
    };

    const fetchCourses = async (filters = {}) => {
        try {
            let url = '/courses/';
            const query = new URLSearchParams(filters).toString();
            if (query) url += `?${query}`;

            const {data} = await axiosReq.get(url);
            setCourses(data);
            console.log(data.results)
            setHasLoaded(true);
        } catch(err) {
            console.log(err)
        }
    };
    


    useEffect(() => {
        // const fetchCourses = async (filters = {}) => {
        //     try {
        //         let url = '/courses/';
        //         const query = new URLSearchParams(filters).toString();
        //         if (query) url += `?${query}`;

        //         const {data} = await axiosReq.get('/courses/');
        //         setCourses(data);
        //         console.log(data.results)
        //         setHasLoaded(true);
        //     } catch(err) {
        //         console.log(err)
        //     }
        // };
        // const fetchCourses = async () => {
        //     try {
        //         const {data} = await axiosReq.get('/courses/');
        //         setCourses(data);
        //         console.log(data.results)
        //         setHasLoaded(true);
        //     } catch(err) {
        //         console.log(err)
        //     }
        // };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://eduhub-drf-api-8e84adf897cc.herokuapp.com/course-categories/');
                setCategories(response.data);
            } catch(err) {
                setErrors(err.response?.data);
            }
        };

        setHasLoaded(false);
        fetchCourses();
        fetchCategories();
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        const filters = {}

        if (selectedCategories.length > 0) {
            filters.categories = selectedCategories.join(',');
        }

        fetchCourses(filters);
    }

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h1 className='text-center my-5'>Explore our courses</h1>
            <Container>
                <Row>
                    <Col md={3}>
                        <Card>
                            <Card.Header as="h5">Filters</Card.Header>
                            <Form onSubmit={handleSubmit}>
                                <Card.Body>
                                    <Card.Title>Categories</Card.Title>
                                    {Array.isArray(categories) && categories.map((cat, idx) => (
                                        <Form.Check key={idx} value={cat.key} label={cat.value} onChange={handleCategoryChange}/>
                                    ))}
                                    <Card.Title>Resources</Card.Title>
                                    <Form.Check label={<i class="fa-solid fa-video"></i>} />
                                    <Form.Check label={<i class="fa-brands fa-readme"></i>} />
                                    <Form.Check label={<i class="fa-solid fa-pen-to-square"></i>} />
                                    <Card.Title>Ratings</Card.Title>
                                    <Form.Check label={<Rating rating={5} />} />
                                    <Form.Check label={<Rating rating={4} />} />
                                    <Form.Check label={<Rating rating={3} />} />
                                    <Form.Check label={<Rating rating={2} />} />
                                    <Form.Check label={<Rating rating={1} />} />
                                </Card.Body>
                                <Button type="reset">Reset filters</Button>
                                <Button type="submit">Apply filters</Button>
                            </Form>
                        </Card>
                    </Col>
                    <Col  md={9}>
                        {hasLoaded ? (
                            <Row>
                                {courses.results?.length ? (
                                    courses.results.map(course => (
                                        <Col className='mb-3' md={4} key={course.id}>
                                            <CourseCard {...course} setCourses={setCourses} />
                                        </Col>
                                        
                                    ))
                                ) : (
                                    console.log("no results")
                                )}
                            </Row>
                        ) : (
                            console.log('Show spinner')
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CoursesPage