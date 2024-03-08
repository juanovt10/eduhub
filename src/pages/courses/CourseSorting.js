import Nav from 'react-bootstrap/Nav';

const CourseSorting = ({ onSortingApplied }) => {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/home" className='mb-2'>
            <Nav.Item>
                <Nav.Link disabled><i class="fa-solid fa-arrow-down"></i><i class="fa-solid fa-arrow-up"></i> Sort By:</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => onSortingApplied('rating')}><i class="fa-solid fa-star"></i> Highly rated</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => onSortingApplied('price')}><i class="fa-solid fa-hand-holding-dollar"></i> Lowest price</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => onSortingApplied('creation')}><i class="fa-solid fa-clock"></i> Newest</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => onSortingApplied('enrollments')}><i class="fa-solid fa-graduation-cap"></i> Enrollments</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default CourseSorting