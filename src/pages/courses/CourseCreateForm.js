import React from 'react'; 
import { Form } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


const CourseCreateForm = () => {



    return (
        <Form className='pt-5 px-5'>

            <Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter course title" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter your course description" />
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
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Tech</option>
                        <option>Leadership</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" placeholder="Enter teh duration of your course" />
                </Form.Group>


            
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>price</Form.Label>
                    <Form.Control type="number" placeholder="Enter teh cost of your course" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Video hours</Form.Label>
                    <Form.Control type="number" placeholder="Enter the amount of video hours" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Tests</Form.Label>
                    <Form.Control type="number" placeholder="Enter the amount of tests" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Articles</Form.Label>
                    <Form.Control type="number" placeholder="Enter the amount of articles" />
                </Form.Group>
            </Row>
        
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default CourseCreateForm;