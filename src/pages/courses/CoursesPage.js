import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormCheck, Row } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults';
import CourseCard from './CourseCard';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Asset from '../../components/Asset';
import Rating from '../../components/Rating';


const CoursesPage = () => {
    const [courses, setCourses] = useState({ results: [] });
    const [coursesHasLoaded, setCoursesHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
    const [categories, setCategories] = useState({});
    const [errors, setErrors] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([])
    const [filterVideos, setFilterVideos] = useState(false);
    const [filterArticles, setFilterArticles] = useState(false);
    const [filterTests, setFilterTests] = useState(false);
    const [sortKey, setSortKey] = useState('default');
    const [minRating, setMinRating] = useState(0);


    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedCategories(prev => [...prev, value])
        } else {
            setSelectedCategories(prev => prev.filter(category => category !== value));
        }
    };

    const fetchCourses = async (filters = {}) => {
        try {
            let url = '/courses/';
            const query = new URLSearchParams(filters).toString();
            if (query) url += `?${query}`;

            const {data} = await axiosReq.get(url);
            setCourses(data);
        } catch(err) {
            console.log(err)
        } finally {
            setCoursesHasLoaded(true);
        }
    };

    


    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://eduhub-drf-api-8e84adf897cc.herokuapp.com/course-categories/');
                setCategories(response.data.slice(1));
            } catch(err) {
                setErrors(err.response?.data);
            } finally {
                setCategoriesHasLoaded(true);
            }
        };

        
        fetchCourses();
        fetchCategories();
    }, []);

    const sortCourses = (sortKey) => {
        const sortedCourses = [...courses.results]

        if (sortKey === 'rating') {
            sortedCourses.sort((a, b) => (b.overall_rating || 0) - (a.overall_rating || 0))
        } else if (sortKey === 'price') {
            sortedCourses.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        } else if (sortKey === 'creation') {
            sortedCourses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sortKey === 'enrollments') {
            sortedCourses.sort((a, b) => b.enrollments_count - a.enrollments_count)
        }

        setCourses(prevCourses => ({
            ...prevCourses,
            results: sortedCourses
        })); 
        console.log(sortedCourses)
        setSortKey(sortKey);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const filters = {}

        if (selectedCategories.length > 0) {
            filters.category = selectedCategories.join(',');
        }
        if (filterVideos) {
            filters.has_videos = true;
        }
        if (filterArticles) {
            filters.has_articles = true;
        }
        if (filterTests) {
            filters.has_tests = true; 
        }
        if (minRating) {
            filters.min_rating = minRating;
        }

        setCoursesHasLoaded(false);
        fetchCourses(filters);
    }

    const handleFilterReset = () => {
        setSelectedCategories([]);
        setFilterVideos(false);
        setFilterArticles(false);
        setFilterTests(false);
        setMinRating(0);

        setCoursesHasLoaded(false);
        fetchCourses({});
    }

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h1 className='text-center my-5'>Explore our courses</h1>
            
            <Container>
                <Row>
                    <Col md={3}>
                        <Card>
                            <Card.Header as="h5">Filters</Card.Header>
                            {categoriesHasLoaded ? (
                            <Form onSubmit={handleSubmit}>
                                <Card.Body>
                                    <Card.Title>Categories</Card.Title>
                                    {Array.isArray(categories) && categories.map((cat, idx) => (
                                        <Form.Check 
                                            key={idx} 
                                            value={cat.key}
                                            label={cat.value}
                                            onChange={handleCategoryChange}
                                            checked={selectedCategories.includes(cat.key)}
                                        />
                                    ))}
                                    <Card.Title>Resources</Card.Title>
                                    <Form.Check
                                        label={<i class="fa-solid fa-video"></i>}
                                        checked={filterVideos}
                                        onChange={e => setFilterVideos(e.target.checked)}
                                    />
                                    <Form.Check
                                        label={<i class="fa-brands fa-readme"></i>}
                                        checked={filterArticles}
                                        onChange={e => setFilterArticles(e.target.checked)}
                                    />
                                    <Form.Check
                                        label={<i class="fa-solid fa-pen-to-square"></i>}
                                        checked={filterTests}
                                        onChange={e => setFilterTests(e.target.checked)}
                                    />
                                <Card.Title>Ratings</Card.Title>
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <Form.Check 
                                        key={rating}
                                        type='radio'
                                        name='ratingFilter'
                                        label={<Rating rating={rating}/>}
                                        onChange={() => setMinRating(rating)}
                                        checked={minRating === rating}
                                    />
                                ))}
                                </Card.Body>
                                
                                <Button onClick={handleFilterReset}>Reset filters</Button>
                                <Button type="submit">Apply filters</Button>
                            </Form>
                            ) : (
                            <Row>
                                <Col className='d-flex justify-content-center align-items-center my-4'>
                                    <Asset spinner />
                                </Col>
                            </Row>
                            )}
                        </Card>
                    </Col>
                    <Col  md={9}>
                    <Nav fill variant="tabs" defaultActiveKey="/home" className='mb-2'>
                        <Nav.Item>
                            <Nav.Link disabled><i class="fa-solid fa-arrow-down"></i><i class="fa-solid fa-arrow-up"></i> Sort By:</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => sortCourses('rating')}><i class="fa-solid fa-star"></i> Highly rated</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => sortCourses('price')}><i class="fa-solid fa-hand-holding-dollar"></i> Lowest price</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => sortCourses('creation')}><i class="fa-solid fa-clock"></i> Newest</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => sortCourses('enrollments')}><i class="fa-solid fa-graduation-cap"></i> Enrollments</Nav.Link>
                        </Nav.Item>
                    </Nav>
                        {coursesHasLoaded ? (
                            <Row>
                                {courses.results?.length ? (
                                    courses.results.map(course => (
                                        <Col className='mb-3' md={4} key={course.id}>
                                            <CourseCard {...course} setCourses={setCourses} />
                                        </Col>
                                        
                                    ))
                                ) : (
                                <Row>
                                    <Col className='mt-5'>
                                        <Asset message="No results" />
                                    </Col>
                                </Row>
                                )}
                            </Row>
                        ) : (
                            <Row>
                                <Col className='mt-5'>
                                    <Asset spinner />
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>                
            </Container>
        </div>
    )
}

export default CoursesPage