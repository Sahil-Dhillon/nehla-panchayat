import React from 'react'
import BlogSection from '../Components/Home/blog-section'
import History from '../Components/Home/history-section'
import Suggestionbox from '../Components/Home/suggestion'
import Team from '../Components/Home/team-section'
import Video from '../Components/Home/video-home'


const Home = () => {

    return (
        <>
            <Video />
            <History />
            <BlogSection />
            <Team />
            <Suggestionbox />
        </>
    )
}
export default Home