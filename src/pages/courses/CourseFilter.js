import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rating from '../../components/Rating';
import Asset from '../../components/Asset';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../@/components/ui/accordion";
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/CourseFilter.module.css';

const CourseFilter = ({ onFiltersApplied, onHide, mobile }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filterVideos, setFilterVideos] = useState(false);
    const [filterArticles, setFilterArticles] = useState(false);
    const [filterTests, setFilterTests] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [categories, setCategories] = useState({});
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
    
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://eduhub-drf-api-8e84adf897cc.herokuapp.com/course-categories/');
                setCategories(response.data.slice(1));
            } catch(err) {
                console.log(err)
            } finally {
                setCategoriesHasLoaded(true);
            };
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedCategories(prev => [...prev, value]);
        } else {
            setSelectedCategories(prev => prev.filter(category => category !== value));
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onHide();
        
        const filters = {};
        
        
        if (selectedCategories.length > 0) {
            filters.category = selectedCategories.join(',');
        };
        if (filterVideos) {
            filters.has_videos = true;
        };
        if (filterArticles) {
            filters.has_articles = true;
        };
        if (filterTests) {
            filters.has_tests = true; 
        };
        if (minRating) {
            filters.min_rating = minRating;
        };
        
        onFiltersApplied(filters);
    };

    const handleFilterReset = () => {
        onHide();
        setSelectedCategories([]);
        setFilterVideos(false);
        setFilterArticles(false);
        setFilterTests(false);
        setMinRating(0);

        onFiltersApplied({});
    }

    const filterForm = (
        <>
            <Accordion type="multiple" collapsible className={`mb-3 ${styles.filterAccordion}`}>
                <AccordionItem value='item-2'>
                    <AccordionTrigger className={styles.AccordionCategory}>Resources</AccordionTrigger>
                    <AccordionContent>
                        <Form.Check
                            label={<i className="fa-solid fa-video"></i>}
                            checked={filterVideos}
                            onChange={e => setFilterVideos(e.target.checked)}
                        />
                        <Form.Check
                            label={<i className="fa-brands fa-readme"></i>}
                            checked={filterArticles}
                            onChange={e => setFilterArticles(e.target.checked)}
                        />
                        <Form.Check
                            label={<i className="fa-solid fa-pen-to-square"></i>}
                            checked={filterTests}
                            onChange={e => setFilterTests(e.target.checked)}
                        />
                    </AccordionContent>
                </AccordionItem >

                <AccordionItem value='item-1'>
                    <AccordionTrigger className={styles.AccordionCategory}>Categories</AccordionTrigger>
                    <AccordionContent>
                        {Array.isArray(categories) && categories.map((cat, idx) => (
                            <Form.Check
                                key={idx}
                                value={cat.key}
                                label={cat.value}
                                onChange={handleCategoryChange}
                                checked={selectedCategories.includes(cat.key)}
                            />
                        ))}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-3'>
                    <AccordionTrigger className={styles.AccordionCategory}>Ratings</AccordionTrigger>
                    <AccordionContent>
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <Form.Check
                                key={rating}
                                type='radio'
                                name='ratingFilter'
                                label={<Rating rating={rating} />}
                                onChange={() => setMinRating(rating)}
                                checked={minRating === rating}
                            />
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className={styles.buttonsDiv}>
                <Button onClick={handleFilterReset} className={styles.buttonSecondary}>Reset filters</Button>
                <Button type="submit" className={styles.buttonPrimary}>Apply filters</Button>
            </div>
        </>
    )

    return (
        <div>
            {!mobile ? (
                <Card className={styles.Card}>
                    <Card.Header className={styles.cardTitle} as="h5">Filters</Card.Header>
                    {categoriesHasLoaded ? (
                        <Form onSubmit={handleSubmit}>
                            <Card.Body>
                                {filterForm}
                            </Card.Body>
                        </Form>
                    ) : (
                        <Row>
                            <Col className='d-flex justify-content-center align-items-center my-4'>
                                <Asset spinner />
                            </Col>
                        </Row>
                    )}
                </Card>
            ) : (
                <SheetContent className={`${styles.sheetContainer} ${styles.editCourseSheetContainer}`} side={'left'}>
                    <SheetHeader>
                        <SheetTitle className={styles.sheetTitle}>Filters</SheetTitle>
                    </SheetHeader>
                    <Form onSubmit={handleSubmit} className={styles.sheetForm}>
                        {filterForm}
                    </Form>
                </SheetContent>
            )}

        </div>
    )
}

export default CourseFilter