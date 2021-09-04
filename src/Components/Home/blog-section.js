import React, { useEffect, useState } from 'react';
import firebase from '../../Firebase/firebase'
const Blog = ({ category, date, heading, desc }) => {
    return (
        <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-gray-700">{category}</span>
                <span className="mt-1 text-gray-500 text-sm">{date}</span>
            </div>
            <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{heading}</h2>
                <p className="leading-relaxed">{desc}</p>
                {/* <a className="text-indigo-500 inline-flex items-center mt-4">Learn More
                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </a> */}
            </div>
        </div>
    )
}
const BlogSection = () => {
    const [data, setData] = useState()
    useEffect(() => {
        const blogRef = firebase.database().ref('English/blog-data')
        blogRef.on('value', (snapshot) => {
            const blogSnap = snapshot.val()
            const blogList = []
            for (let index in blogSnap) {
                blogList.push(blogSnap[index])
            }
            setData(blogList)
        })
    }, [])
    return (
        <section className="text-gray-600 body-font overflow-hidden">

            <div className="container px-5 py-24 mx-auto">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 py-4 text-gray-900">Ongoing Development Projects</h1>
                <div className="-my-8 divide-y-2 divide-gray-100">
                    {data ? data.map((data, index) => {
                        return (
                            <Blog key={index} {...data} />
                        )
                    }) : ''
                    }
                </div>
            </div>
        </section>
    )
}

export default BlogSection