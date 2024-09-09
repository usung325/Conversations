import React, { useRef, useEffect } from 'react'
import SnapScrollContainer from './containers/SnapscrollContainer';

export default function TextContent({ vidRef }) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

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
        <div className="flex h-screen text-xs">
            <div ref={containerRef} className="flex items-end gap-x-10 my-auto">

                <div className="flex-auto items-start ">

                    <div className="flex flex-col items-end gap-2 mb-5">
                        <p>by Anthony Alterio</p>
                        <p className="w-[25em]">
                            Ut dignissim nibh id ante porttitor, et mollis nibh sollicitudin. Integer in neque nec enim iaculis pellentesque. Fusce condimentum, arcu in semper tincidunt, purus sapien commodo dui, id suscipit mi metus a ex. Nunc lectus arcu, viverra non lobortis sed, vehicula quis massa. In tincidunt, tortor vitae porta consequat, augue dolor scelerisque sem, vel rhoncus nisl neque sit amet lorem. Vestibulum tempor est quis blandit eleifend. Fusce nisl metus, sodales in sagittis quis, lacinia in turpis. Aliquam mollis tortor et felis malesuada efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed aliquam tellus metus, vitae ultricies quam cursus in. Integer sit amet magna mi. Suspendisse elementum ultrices est, id feugiat erat luctus et. Vestibulum dictum, ipsum quis commodo fermentum, felis dolor varius est, sed consectetur ex est et leo. Integer neque mauris, volutpat vel diam a, finibus luctus metus. Curabitur non elementum elit, id volutpat justo. Integer interdum venenatis mattis.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p>choreo: male identifying heterosexual body</p>
                        <p>performance: my lgbtqia+ body</p>
                    </div>
                </div>

                <div className="w-[100%] video-wrapper">
                    <video ref={videoRef} width="500" height="auto" autoPlay muted>
                        <source src={`/images/${vidRef}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                {/* <img src="/images/imAnthony.png" className="h-[50em]" /> */}



            </div>
        </div>
    )
}