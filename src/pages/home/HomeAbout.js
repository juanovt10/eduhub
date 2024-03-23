import React from 'react'
import styles from "../../styles/Home.module.css";

const HomeAbout = () => {
    return (
        <div id="homeAbout" className={`mb-5 text-justify ${styles.about}`}>
            <h2>What we do?</h2>
            <p>
                Our core philosophy is simple: mastering by teaching. Our platform
                is designed to empower individuals to deepen their understanding of
                arious subjects by teaching others. It's a place where sharing
                knowledge enriches both teacher and learner, creating a cycle of
                continuous learning and growth.
            </p>
            <p>
                From novices exploring new territories to experts honing their craft,
                our community thrives on the exchange of knowledge. By transforming
                learners into teachers, we unlock an unparalleled depth of understanding,
                fostering a dynamic environment where education is both a journey and a
                destination.
            </p>
            <p>
                Join our vibrant community where curiosity leads to discovery,
                and teaching becomes the bridge to mastery. Whether you're seeking
                to reinforce your expertise or embark on a new learning adventure,
                our platform is your space to connect, share, and flourish together.
            </p>
        </div>
    )
}

export default HomeAbout