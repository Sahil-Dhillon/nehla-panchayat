import React, { useEffect, useState } from 'react';
import firebase from '../../Firebase/firebase'

function PdsData() {
    const [data, setData] = useState([]);

    // GET request function to your Mock API
    const fetchData = () => {
        const pdsRef = firebase.database().ref('PDS')
        pdsRef.on("value", (snap) => {
            const pdsSnap = snap.val()
            const pdsList = []
            for (let index in pdsSnap) {
                pdsList.push(pdsSnap[index])
            }
            setData(pdsList)
        })
    }

    // Calling the function on component mount
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <section>
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-8 text-gray-900">Public Distribution System</h1>
                    <table>
                        <thead>
                            <tr>
                                <th className="bg-black text-white border-gray-200 border  p-4">Date</th>
                                <th className="bg-black text-white border-gray-200 border  p-4">Name</th>
                                <th className="bg-black text-white border-gray-200 border  p-4">Type</th>
                                <th className="bg-black text-white border-gray-200 border  p-4">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => (
                                    <tr className="border-y-2 border-black" key={index}>
                                        <td className="bg-gray-200 border border-black">{item.date}</td>
                                        <td className="bg-gray-200 border border-black">{item.name}</td>
                                        <td className="bg-gray-200 border border-black">{item.type}</td>
                                        <td className="bg-gray-200 border border-black">{item.quantity}</td>
                                        <td />
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default PdsData;