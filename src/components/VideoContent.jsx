import React, { useRef, useEffect } from 'react'

export default function VideoContent({ vidRef }) {

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    console.log(vidRef)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }


        // containerRef.current
        // containerRef.current.scrollIntoView({
        //     top: 0,
        //     behavior: 'instant',
        // });


    }, [vidRef]);

    return (
        <div ref={containerRef} >
            <div className="w-[100%] video-wrapper pt-[25vh]">
                <video ref={videoRef} width="300" height="auto" autoPlay muted>
                    <source src={`/images/${vidRef}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}