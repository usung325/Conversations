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
    const [opacityVal, setOpacityVal] = useState(0.5);
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
    console.log(imagesWithRelativePositions, 'lol')
    const newImages = imagesWithRelativePositions.filter(im => im.city !== city)
    const newImagesWithoutOverlap = newImages.filter(obj => Math.abs(obj.relativeX) > 80 || Math.abs(obj.relativeY) > 100)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeout(() => {
                setOpacityVal((prevOpacity) => {
                    if (prevOpacity <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return Math.max(prevOpacity - 0.01, 0);
                });
            }, 800);
        }, 30);

        return () => clearInterval(timer);
    }, []);

    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <div className="relative w-full h-screen overflow-hidden">
                <NavLink to={`/`} className="logoIcon absolute top-2">
                    <div
                        className="z-[10000]"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <img
                            src={isHovering ? "./images/danceWhite.gif" : "./images/LogoGifWhite.png"}
                            className=" w-[6em]"
                            alt="Logo"
                        />
                    </div>
                </NavLink >
                {/* <div className="relative w-full h-screen -z-[6]"> */}
                {opacityVal > 0 && <div className="absolute top-1/2 left-1/2 tansform -translate-x-1/2">
                    {newImagesWithoutOverlap.map((eachIm, index) => (
                        <div
                            style={{
                                left: eachIm.relativeX * 2.7 + (oneViewWidth),
                                top: eachIm.relativeY * 2.7 + (oneViewHeight),
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
                {/* </div> */}
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
                                <h1 className="text-xl">{city}</h1>
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
            </div>

        </>

    )
}