import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useParams } from 'react-router-dom'
import TextContent from './TextContent'
import SnapScrollContainer from './containers/SnapscrollContainer'
import { NavLink } from 'react-router-dom';
import ContentModel from './shaders/ContentModel'
import ContentScene from './shaders/ContentScene'
import PageIndex from './PageIndex'

export default function ContentComponent({ images }) {
    const { city } = useParams();
    const cityList = ['Pittsburgh', 'New York', 'Los Angeles', 'Chicago', 'Sydney', 'Providence', 'Suwanee']
    const [opacityVal, setOpacityVal] = useState(1);
    const vidList = images.find(e => e.city === city).vidList;
    console.log(vidList[0]);

    const oneViewWidth = window.innerWidth / 100
    const oneViewHeight = window.innerHeight / 100

    let pageImagesIndex = 0;

    for (let i = 0; i < images.length; i++) {
        if (images[i].city === city) {
            pageImagesIndex = i
        }
    }
    console.log('this is the curr index:' + pageImagesIndex)

    function calculateRelativePositions(images, referenceIndex = 0) {
        const referenceImage = images[referenceIndex];

        return images.map((image, index) => {
            if (index === referenceIndex) {
                return { ...image, relativeX: 0, relativeY: 0 };
            }

            return {
                ...image,
                relativeX: image.x - referenceImage.x,
                relativeY: image.y - referenceImage.y
            };
        });
    }

    const imagesWithRelativePositions = calculateRelativePositions(images, pageImagesIndex);
    console.log(imagesWithRelativePositions)
    const newImages = imagesWithRelativePositions.filter(im => im.city !== city)


    useEffect(() => {
        const timer = setInterval(() => {
            setOpacityVal((prevOpacity) => {
                if (prevOpacity <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return Math.max(prevOpacity - 0.01, 0);
            });
        }, 30);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {opacityVal > 0 && <div className="absolute top-0 left-0">
                {newImages.map((eachIm, index) => (
                    <div
                        style={{
                            left: eachIm.relativeX * 4 + (10 * oneViewWidth),
                            top: eachIm.relativeY * 2 + (50 * oneViewHeight),
                            width: eachIm.width * oneViewWidth / 5,
                            position: 'absolute',
                            opacity: opacityVal

                        }}
                    >
                        <NavLink
                            to={eachIm.link}>
                            <img src={eachIm.src} />
                        </NavLink>
                    </div>
                ))}
            </div>}
            <div className="flex flex-col mx-10 text-white max-h-screen overflow-hidden">
                <div className="flex flex-row justify-between">
                    {/* <div className="w-[15em]">

                        <div className="flex flex-col my-auto items-start h-screen pl-5">
                            <div className="flex w-full justify-between mt-8 pl-20">
                                <NavLink to='/'>
                                    <motion.p
                                        whileHover={{ scale: 1.5 }}
                                        onHoverStart={e => { }}
                                        onHoverEnd={e => { }}
                                        className="w-auto">
                                        {city}
                                    </motion.p>
                                </NavLink>
                                <p>Oct 5 2024</p>
                            </div>
                            <div className="flex flex-col justify-between h-[40%] my-auto items-start">
                                {cityList.map((currCity, i) => (
                                    <NavLink to={`/${currCity}`}>
                                        <motion.p
                                            whileHover={{ scale: 1.5 }}
                                            onHoverStart={e => { }}
                                            onHoverEnd={e => { }}
                                            key={i}

                                            className={`${currCity === city ? 'text-2xl' : ''}`}
                                        >{currCity}</motion.p>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div> */}

                    <div className="flex flex-col mx-auto">
                        <div className="flex mx-auto m-10">
                            <p>{city}</p>
                        </div>
                        <div className="flex space-y-52 -my-10">
                            <SnapScrollContainer>
                                <div >
                                    <TextContent vidRef={vidList[0]} />
                                </div>
                                <div>
                                    <TextContent vidRef={vidList[1]} />
                                </div>
                                <div>
                                    <TextContent vidRef={vidList[2]} />
                                </div>
                            </SnapScrollContainer>
                        </div>
                    </div>

                </div>
            </div >

            <div className="absolute -z-10 top-0">
                <ContentScene />
            </div>

        </>

    )
}