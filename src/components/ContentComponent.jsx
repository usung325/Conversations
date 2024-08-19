import React, { useEffect } from 'react'
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

    const vidList = images.find(e => e.city === city).vidList;

    console.log(vidList[0]);



    return (
        <>

            <div className="flex flex-col mx-10 text-white max-h-screen">
                <div className="flex flex-row justify-between">
                    <div className="w-[15em]">

                        <div className="flex flex-col my-auto items-start h-screen pl-5">
                            <div className="flex w-full justify-between mt-8">
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
                            <div className="flex flex-col justify-between h-[30%] my-auto items-start">
                                {cityList.map((city, i) => (
                                    <NavLink to={`/${city}`}>
                                        <motion.p
                                            whileHover={{ scale: 1.5 }}
                                            onHoverStart={e => { }}
                                            onHoverEnd={e => { }}
                                            key={i}
                                            className="w-auto"
                                        >{city}</motion.p>
                                    </NavLink>
                                ))}
                            </div>
                        </div>


                    </div>


                    <div className="space-y-52">
                        <SnapScrollContainer>
                            <div>
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
            </div >

            <div className="absolute -z-10 top-0">
                <ContentScene />
            </div>

        </>

    )
}