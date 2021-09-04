import React, { useState, useEffect } from 'react'
import firebase from '../../Firebase/firebase'

const History = () => {
    const [history, setHistory] = useState("")
    useEffect(() => {
        const historyRef = firebase.database().ref("English/history/data")
        historyRef.once("value", (snap) => {
            const historySnap = snap.val()
            setHistory(historySnap)
        })
    }, [])
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center lg:w-2/3 w-full">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">The Glorious History of Nehla</h1>
                    <p className="mb-8 leading-relaxed">{history}</p>

                </div>
            </div>
        </section>
    )
}
export default History