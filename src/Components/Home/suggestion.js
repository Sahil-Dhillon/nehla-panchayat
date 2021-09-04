import React, { useState } from 'react'
import firebase from '../../Firebase/firebase'
const Suggestionbox = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        const suggestionRef = firebase.database().ref('Suggestion')
        const postRef = suggestionRef.push()
        postRef.set({
            email: email.trim(),
            suggestion: message.trim(),
            when: firebase.database.ServerValue.TIMESTAMP
        })
        setEmail("")
        setMessage("")
    }
    return (
        <section className="text-gray-600 body-font relative">
            <div className="absolute inset-0 bg-gray-300">
                <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6949.176340400822!2d75.73525072360349!3d29.4408307718021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391181b7a5c2083b%3A0xb62f026c9f569acf!2sNehla%2C%20Haryana%20125112!5e0!3m2!1sen!2sin!4v1626591749494!5m2!1sen!2sin" allowfullscreen="" loading="lazy"
                    style={{ opacity: 0.9 }}
                ></iframe>
            </div>
            <div className="container px-5 py-24 mx-auto flex">
                <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Suggestions</h2>
                    <p className="leading-relaxed mb-5 text-gray-600">Post any suggestions you want to be considered for development of village.</p>
                    <form onSubmit={handleSubmit}>

                        <div className="relative mb-4">
                            <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter your email id" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="relative mb-4">
                            <label for="message" className="leading-7 text-sm text-gray-600">Message</label>
                            <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder="Enter any suggestion" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                        <p className="text-xs text-gray-500 mt-3">The above suggestion will be sent to Eco Club Team and Nehla Gram Panchayat as well.</p>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Suggestionbox