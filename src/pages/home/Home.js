import React from 'react'
import HeroSection from './HeroSection'
import HomeFeatureCourses from './HomeFeatureCourses'
import HomeFAQs from './HomeFAQs'
import HomeAbout from './HomeAbout'
import styles from "../../styles/Home.module.css"

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <HeroSection />
            <HomeAbout />
            <HomeFeatureCourses />
            <HomeFAQs />
        </div>
    )
}

export default Home