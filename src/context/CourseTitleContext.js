import React, { createContext, useContext, useState } from 'react'
import { axiosReq } from '../api/axiosDefaults';

const CourseTitleContext = createContext()

export const useCourseTitles = () => useContext(CourseTitleContext)

export const CourseTitleProvider = ({ children }) => {
    const [titles, setTitles] = useState({});

    const getCourseTitle = async (courseId, axiosReq) => {
        if (!titles[courseId]) {
            try {
                const response = await axiosReq.get(`/courses/${courseId}`);
                const newTitles = { ...titles, [courseId]: response.data.title }
                setTitles(newTitles);
                return response.data.title;
            } catch (error) {
                console.error("Failed to fetch course title:", error);
            }
        }
        return titles[courseId]
    };

    return (
        <CourseTitleContext.Provider value={{ getCourseTitle, titles}}>
            { children }
        </CourseTitleContext.Provider>
    )
}