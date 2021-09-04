import React, { useState, useEffect } from "react"
import firebase from "../../Firebase/firebase"


const ImageCard = ({ src }) => {

    return (
        <div className="lg:w-1/3 sm:w-1/2 p-4">
            <div className="flex relative">
                {/* <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src={src} /> */}
                <img alt="gallery" className=" inset-0 w-full h-full object-cover object-center" src={src} />
            </div>
        </div>
    )
}

const ImgSection = () => {
    const [allImages, setImages] = useState([]);
    useEffect(() => {
        const storageRef = firebase.storage().ref('/Gallery')
        storageRef.listAll().then((res) => {
            res.items.forEach((imageRef) => {
                imageRef.getDownloadURL().then((url) => {
                    setImages((allImages) => [...allImages, url]);
                });
            });
        })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Gallery</h1>

                </div>
                <div className="flex flex-wrap -m-4">
                    {allImages.map((image) => {
                        return (
                            <ImageCard key={image} src={image} />
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default ImgSection