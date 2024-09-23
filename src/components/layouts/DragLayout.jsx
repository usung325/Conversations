import LandingScene from '../shaders/LandingScene';
import React, { useState, useRef, useEffect, useReducer } from 'react'
import { motion, useAnimate } from 'framer-motion'
import { NavLink } from 'react-router-dom'

export default function DragLayout({ images }) {

    const [pos, dispatch] = useReducer(reducer, { x: 0, y: 0, offX: 0, offY: 0, isDragging: false })
    const [scope, aniamte] = useAnimate()
    const [currCenter, setCurrCenter] = useState({ currCenterX: 0, currCenterY: 0, currWidth: 0, currHeight: 0, id: null })

    const oneViewWidth = window.innerWidth / 100
    const oneViewHeight = window.innerHeight / 100

    const handleMouseDown = (e) => {
        dispatch({
            type: 'MOUSE_DOWN',
            isDragging: true,
            offX: e.clientX - pos.x,
            offY: e.clientY - pos.y,
            isClickingIm: e.target.tagName === 'IMG'
        })
    }

    const handleMouseUp = () => {
        dispatch({
            type: 'MOUSE_UP',
            isDragging: false,

        })
    }

    const handleMouseMove = (e) => {
        dispatch({
            type: 'MOUSE_MOVE',
            x: e.clientX - pos.offX,
            y: e.clientY - pos.offY

        })
    }

    const handleCentering = () => {
        dispatch({
            type: 'CENTER',
            currCenterX: currCenter.currCenterX,
            currCenterY: currCenter.currCenterY,
            currWidth: currCenter.currWidth,
            currHeight: currCenter.currHeight,
            vwConversion: oneViewWidth,
            vhConversion: oneViewHeight,
            windowMidX: window.innerWidth / 2,
            windowMidY: window.innerHeight / 2,
        })
    }

    function reducer(pos, action) {
        switch (action.type) {

            case 'MOUSE_DOWN': {
                return { ...pos, isDragging: true, offX: action.offX, offY: action.offY }
            }

            case 'MOUSE_UP': {
                return { ...pos, isDragging: false }
            }

            case 'MOUSE_MOVE': {
                if (pos.isDragging) {
                    return { ...pos, x: action.x, y: action.y }
                }
                else {
                    return pos
                }
            }

            case 'CENTER': {
                const targetX = action.currCenterX * action.vwConversion
                const targetY = action.currCenterY * action.vhConversion
                const width = action.currWidth
                const height = action.currHeight
                console.log('width: ' + (targetX - width) + 'height: ' + (targetX - height))
                return {
                    ...pos,
                    x: action.windowMidX - targetX - width / 2,
                    y: action.windowMidY - targetY - height / 2
                }
            }

            default:
                return pos
        }
    }

    const findCenterIm = () => {
        let cssArr;
        let leftTopArr;
        let currCenteredDOM = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2)

        currCenteredDOM.forEach(div => div.className.includes('imgDiv') ? (
            console.log(Math.ceil(div.getBoundingClientRect().width)),
            console.log(Math.ceil(div.getBoundingClientRect().height)),
            cssArr = div.style.cssText.split(";"),
            leftTopArr = cssArr.filter(css => css.includes("left") || css.includes("top")),
            setCurrCenter({
                ...currCenter,
                id: div.id,
                currCenterX: parseFloat(leftTopArr[0].slice(6, leftTopArr[0].length - 2)),
                currCenterY: parseFloat(leftTopArr[1].slice(6, leftTopArr[1].length - 2)),
                currWidth: +Math.ceil(div.getBoundingClientRect().width),
                currHeight: +Math.ceil(div.getBoundingClientRect().height)
            })
        ) : null)
    }


    useEffect(() => {
        findCenterIm()
        aniamte(scope.current, {
            x: pos.x, y: pos.y,
            // yoyo: Infinity,
            // type: 'inertia',
            // velocity: 0
        })
    }, [pos])


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!pos.isDragging) {
                handleCentering()
            }
        }, 2000);

        return () => clearInterval(intervalId);
    }, [currCenter, pos.isDragging]);

    return (
        <>
            <div className="grid grid-cols-2 gap-x-10 text-2xl justify-start pl-[40vw] fixed top-0 left-0 z-10">
                <p className="text-orange-500">pos.x: {pos.x / window.innerWidth * 100}</p>
                <p className="text-orange-500">pos.y: {pos.y / window.innerHeight * 100}</p>

                <p className="text-green-500">vw: {currCenter.currCenterX}</p>
                <p className="text-green-500">vh: {currCenter.currCenterY}</p>


                <p className="text-pink-600">{pos.isDragging ? "dragging" : "not dragging"}</p>
                <p className="text-pink-600">1vw in pixels: {oneViewWidth}</p>

                <p className="text-teal-900">offX: {pos.offX}</p>
                <p className="text-teal-900">offY: {pos.offY}</p>
            </div>


            <div className="w-full h-screen overflow-hidden relative "
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div ref={scope}>
                    {images.map((img, i) => (
                        <motion.div
                            whileHover={{ scale: 1.5 }}
                            style={{
                                left: img.x + 'vw',
                                top: img.y + 'vh',
                                width: img.width + 'vw',
                                height: 'auto',
                                position: 'absolute',
                            }}
                            id={"im" + i}
                            className="imgDiv"
                        >

                            <nav>
                                <NavLink
                                    to={img.link}
                                    onClick={(e) => {
                                        if (isDragging) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt || `image ${i}`}
                                    />
                                </NavLink>
                            </nav>

                        </motion.div>
                    ))}

                    {/* 
                    <div
                        style={{
                            left: '0vw',
                            top: '0vh',
                            width: '10vw',
                            height: 'auto',
                            position: 'absolute',
                        }}
                        id="im1"
                        className="imgDiv"
                    >
                        <img src="/images/im1.jpg" />
                    </div>


                    <div
                        style={{
                            left: '40vw',
                            top: '50vh',
                            width: '20vw',
                            height: 'auto',
                            position: 'absolute',
                        }}
                        id="im2"
                        className="imgDiv"
                    >
                        <img src="/images/im1.jpg" />
                    </div>


                    <div
                        style={{
                            left: '30vw',
                            top: '100vh',
                            width: '15vw',
                            height: 'auto',
                            position: 'absolute',
                        }}
                        id="im2"
                        className="imgDiv"
                    >
                        <img src="/images/im1.jpg" />
                    </div>


                    <div
                        style={{
                            left: '-30vw',
                            top: '-100vh',
                            width: '10vw',
                            height: 'auto',
                            position: 'absolute',
                        }}
                        id="im2"
                        className="imgDiv"
                    >
                        <img src="/images/im1.jpg" />
                    </div> */}


                </div>
            </div>
            <div className="absolute -z-10 top-0">
                <LandingScene />
            </div>
        </>
    )
}