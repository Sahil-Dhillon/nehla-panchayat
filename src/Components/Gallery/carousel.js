import React, { useState } from 'react';
import { imgdata } from '../../Data/homeimgdata';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
const Carousel = () => {

    const [index, setIndex] = useState(1)
    const { image, name } = imgdata[index]
    const checkNumber = (number) => {
        if (number > imgdata.length - 1) {
            return 0;
        }
        if (number < 0) {
            return imgdata.length - 1;
        }
        return number;
    };
    const prevImg = () => {
        setIndex((index) => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        })

    }
    const nextImg = () => {
        setIndex((index) => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        })
    }
    return (
        <div className="home-carousel">
            <div className="img-container">
                <img src={image} alt={name} />
                <div className="arrows-container">
                    <div className="arrows" onClick={prevImg}>
                        {/* <FaArrowLeft  /> */}
                        <IoIosArrowBack />

                    </div>
                    <div className="arrows" onClick={nextImg}>
                        {/* <FaArrowRight  /> */}
                        <IoIosArrowForward />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel;