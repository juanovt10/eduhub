import React from 'react'
import HeroSection from './HeroSection'
import HomeFeatureCourses from './HomeFeatureCourses'
import HomeFAQs from './HomeFAQs'
import HomeAbout from './HomeAbout'

const Home = () => {
    return (
        <>
            <HeroSection />
            <HomeAbout />
            {/* <HomeFeatureCourses /> */}
            <HomeFAQs />
        </>
    )
}

export default Home