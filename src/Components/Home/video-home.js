import React from "react";
import videosrc from '../../assets/video/vid1.mp4'

const Video = () => {
    return (
        <>
            <video src={videosrc} muted autoPlay loop style={{ width: '100%' }}></video>
        </>
    )
}
export default Video