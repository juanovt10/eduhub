import React, { useEffect, useRef, useState } from 'react'; 
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../@/components/ui/sheet";
import styles from '../../styles/ReviewEdit.module.css'




const CourseCreateForm = ({onHide}) => {

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
    });

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
            });
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', imageInput.current.files[0]);
        formData.append('category', category);
        formData.append('duration', duration);
        formData.append('price', price);
        formData.append('video_hours', videoHours);
        formData.append('test_count', testCount);
        formData.append('article_count', articleCount);

        try {
            const {data} = await axiosReq.post('/courses/', formData);
            history.push(`/courses/${data.id}`);
        } catch(err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
        };
    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://eduhub-drf-api-8e84adf897cc.herokuapp.com/course-categories/');
                setCategories(response.data);
            } catch(err) {
                setErrors(err.response?.data);
            };
        };

        fetchCategories();
    }, []);

    return (
       
        <SheetContent className={`${styles.sheetContainer} ${styles.editCourseSheetContainer}`} side={'right'}>
            <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Create course</SheetTitle>
            </SheetHeader>

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
                            value={videoHours}
                            onChange={handleChange}
                            type="number"
                            placeholder="Enter the amount of video hours" />
                    </Form.Group>
                    {errors.videoHours?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group as={Col}>
                        <Form.Label>Tests</Form.Label>
                        <Form.Control
                            name="testCount"
                            value={testCount}
                            onChange={handleChange}
                            type="number"
                            placeholder="Enter the amount of tests" />
                    </Form.Group>
                    {errors.testCount?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group as={Col}>
                        <Form.Label>Articles</Form.Label>
                        <Form.Control
                            name="articleCount"
                            value={articleCount}
                            onChange={handleChange}
                            type="number"
                            placeholder="Enter the amount of articles" />
                    </Form.Group>
                    {errors.articleCount?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </Row>
            
                <Button className={styles.buttonPrimary} type="submit">
                    Submit
                </Button>
                <Button 
                    className={styles.buttonSecondary}
                    onClick={onHide}    
                >
                    discard changes
                </Button>
            </Form>
        </SheetContent>
    )
}

export default CourseCreateForm;