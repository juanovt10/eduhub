import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import Col from 'react-bootstrap/Col';
import CourseCard from '../courses/CourseCard';

const ProfileCourses = () => {

    const [courses, setCourses] = useState([]);
    const [enrolledFilter, setEnrolledFilter] = useState(true);
    const [wishListFilter, setWishListFilter] = useState(false);


    const fetchCourses = async (filters = {}) => {
        try {
            let url = '/courses/';
            const query = new URLSearchParams(filters).toString();
    
            if (query) url += `?${query}`;
    
            const { data } = await axiosReq.get(url)
    
            console.log(data);
            setCourses(data);
            
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        const filters = {}

        if (enrolledFilter) {
            filters.enrolled = true;
        } 

        if (wishListFilter) {
            filters.wish_listed = true;
        }



        fetchCourses(filters)
    }, [enrolledFilter, wishListFilter]);

    const handleEnrollFilter = () => {
        setEnrolledFilter(true);
        setWishListFilter(false);
    }

    const handleWishListFilter = () => {
        setEnrolledFilter(false);
        setWishListFilter(true);
    }

    return (
        <div>
            <button onClick={handleEnrollFilter}>Enrolled</button>
            <button onClick={handleWishListFilter}>Wish listed</button>
            {courses.results?.length && (
                courses.results.map(course => (
                    <ul>
                        <li>
                            {course.title}
                        </li>
                    </ul>
                ))
            )}
        </div>
    )
}

export default ProfileCourses