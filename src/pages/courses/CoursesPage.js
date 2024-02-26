import React from 'react'
import { Col, Row } from 'react-bootstrap'

const CoursesPage = () => {
    return (
        <div>
            <h1 className='text-center my-5'>Explore our courses</h1>
            <Row>
                <Col md={3}>
                    FILTER CARD
                </Col>
                <Col md={9}>
                    COURSES DISPLAY
                </Col>
            </Row>
        </div>
    )
}

export default CoursesPage