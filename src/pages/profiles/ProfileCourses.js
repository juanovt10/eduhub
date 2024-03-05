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
    }, []);


    return (
        <div>
            <button onClick={() => {setEnrolledFilter(true)}}>Enrolled</button>
            <button onClick={() => {setWishListFilter(true)}}>Wish listed</button>
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