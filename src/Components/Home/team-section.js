import React, { useState, useEffect } from 'react'
// import { memberData } from '../Data/memberData'
import firebase from '../../Firebase/firebase'
const Members = ({ Name, Designation, img }) => {
    return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={img} />
                <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium capitalize">{Name}</h2>
                    <p className="text-gray-500 capitalize">{Designation}</p>
                </div>
            </div>
        </div>
    )
}
const Team = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const membersRef = firebase.database().ref('English/member-data')
        membersRef.on('value', (snapshot) => {
            const memberSnap = snapshot.val();
            const memberList = [];
            for (let index in memberSnap) {
                memberList.push(memberSnap[index]);
            }
            console.log(memberList)
            setData(memberList);
        }, (e) => { console.log('read failed:' + e.name) });
    }, [])
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Members of Panchayat</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {data ?
                        data.map((data, index) => {
                            return (

                                <Members key={index} {...data} />

                            )
                        }) : ""
                    }
                </div>
            </div>
        </section>
    )
}
export default Team;