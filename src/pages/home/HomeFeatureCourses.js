import React from 'react';
import CoursesDisplay from '../courses/CoursesDisplay';

const HomeFeatureCourses = () => {
    return (
        <div className='mb-5'>
            <h2 className='mb-4'>Featured courses</h2>
            <CoursesDisplay sortKey='rating' isHomePage />
        </div>
    )
}

export default HomeFeatureCourses