import LandingScene from "../shaders/LandingScene";
import React, { useState, useRef, useEffect, useReducer } from "react";
import { motion, useAnimate } from "framer-motion";
import { NavLink } from "react-router-dom";
import DanceButton from "../DanceButton";
import "./DragLayout.css";

export default function DragLayout({ images }) {
  const [initialState, setInitialState] = useState(false);
  let usedIndices = new Set();

  const [isHovering, setIsHovering] = useState(false);

  const [pos, dispatch] = useReducer(reducer, {
    x: 0,
    y: 0,
    offX: 0,
    offY: 0,
    isDragging: false,
  });
  const [scope, aniamte] = useAnimate();
  const [currCenter, setCurrCenter] = useState({
    currCenterX: 0,
    currCenterY: 0,
    currWidth: 0,
    currHeight: 0,
    isRandoming: false,
    id: null,
  });

  const oneViewWidth = window.innerWidth / 100;
  const oneViewHeight = window.innerHeight / 100;

  const handleMouseDown = (e) => {
    dispatch({
      type: "MOUSE_DOWN",
      isDragging: true,
      offX: e.clientX - pos.x,
      offY: e.clientY - pos.y,
      isClickingIm: e.target.tagName === "IMG",
    });
  };

  const handleMouseUp = () => {
    dispatch({
      type: "MOUSE_UP",
      isDragging: false,
    });
  };

  const handleMouseMove = (e) => {
    dispatch({
      type: "MOUSE_MOVE",
      x: e.clientX - pos.offX,
      y: e.clientY - pos.offY,
    });
  };

  const handleCentering = () => {
    dispatch({
      type: "CENTER",
      currCenterX: currCenter.currCenterX,
      currCenterY: currCenter.currCenterY,
      currWidth: currCenter.currWidth,
      currHeight: currCenter.currHeight,
      vwConversion: oneViewWidth,
      vhConversion: oneViewHeight,
      windowMidX: window.innerWidth / 2,
      windowMidY: window.innerHeight / 2,
    });
  };

  const handleRandomCentering = () => {
    let currIndex = getNonRepeatingRandomIndex(images.length);
    currIndex = currIndex();
    console.log(currIndex, "this is curr index");
    dispatch({
      type: "RANDOM_CENTER",
      currCenterX: images[currIndex].x,
      currCenterY: images[currIndex].y,
      currWidth: images[currIndex].width,
      currHeight: images[currIndex].width,
      vwConversion: oneViewWidth,
      vhConversion: oneViewHeight,
      windowMidX: window.innerWidth / 2,
      windowMidY: window.innerHeight / 2 + (window.innerHeight / 100) * 2, // this is where you calculate the center
    });
  };

  function getNonRepeatingRandomIndex(arrayLength) {
    // Initialize a Set to keep track of used indices

    return function () {
      // If all indices have been used, reset the Set
      if (usedIndices.size === arrayLength) {
        usedIndices.clear();
      }

      let randIndex;
      do {
        randIndex = Math.floor(Math.random() * arrayLength);
      } while (usedIndices.has(randIndex));

      // Add the index to the Set of used indices
      usedIndices.add(randIndex);

      return randIndex;
    };
  }

  function reducer(pos, action) {
    switch (action.type) {
      case "MOUSE_DOWN": {
        return {
          ...pos,
          isDragging: true,
          offX: action.offX,
          offY: action.offY,
        };
      }

      case "MOUSE_UP": {
        return { ...pos, isDragging: false };
      }

      case "MOUSE_MOVE": {
        if (pos.isDragging) {
          return { ...pos, isRandoming: false, x: action.x, y: action.y };
        } else {
          return pos;
        }
      }

      case "CENTER": {
        const targetX = action.currCenterX * action.vwConversion;
        const targetY = action.currCenterY * action.vhConversion;
        const width = action.currWidth;
        const height = action.currHeight;
        console.log(
          "width: " + (targetX - width) + "height: " + (targetX - height)
        );
        return {
          ...pos,
          x: action.windowMidX - targetX - width / 2,
          y: action.windowMidY - targetY - height / 2,
        };
      }

      case "RANDOM_CENTER": {
        const targetX = action.currCenterX * action.vwConversion;
        const targetY = action.currCenterY * action.vhConversion;
        const width = action.currWidth * action.vwConversion;
        const height = action.currHeight * action.vwConversion;
        return {
          ...pos,
          isRandoming: true,
          x: action.windowMidX - targetX - width / 2,
          y: action.windowMidY - targetY - height / 2,
        };
      }

      default:
        return pos;
    }
  }

  const findCenterIm = (xPos, yPos) => {
    let cssArr;
    let leftTopArr;
    let currCenteredDOM = document.elementsFromPoint(xPos, yPos);

    currCenteredDOM.forEach((div) =>
      div.className.includes("imgDiv")
        ? (console.log(Math.ceil(div.getBoundingClientRect().width)),
          console.log(Math.ceil(div.getBoundingClientRect().height)),
          (cssArr = div.style.cssText.split(";")),
          (leftTopArr = cssArr.filter(
            (css) => css.includes("left") || css.includes("top")
          )),
          setCurrCenter({
            ...currCenter,
            id: div.id,
            currCenterX: parseFloat(
              leftTopArr[0].slice(6, leftTopArr[0].length - 2)
            ),
            currCenterY: parseFloat(
              leftTopArr[1].slice(6, leftTopArr[1].length - 2)
            ),
            currWidth: +Math.ceil(div.getBoundingClientRect().width),
            currHeight: +Math.ceil(div.getBoundingClientRect().height),
          }))
        : null
    );
  };

  useEffect(() => {
    findCenterIm(0, 0);
    const intervalId = setTimeout(() => {
      handleRandomCentering();
      setInitialState(true);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    findCenterIm(window.innerWidth / 2, window.innerHeight / 2);
    aniamte(scope.current, {
      x: pos.x,
      y: pos.y,
      // yoyo: Infinity,
      // type: 'inertia',
      // velocity: 0
    });
  }, [pos]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (initialState && !pos.isDragging && !pos.isRandoming) {
        handleCentering();
        console.log("working");
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currCenter, pos.isDragging]);

  return (
    <>
      <div className="w-full h-screen fixed top-0">
        <div className="z-[900]">
          {/* <img src="./images/Logo.png" className="absolute top-5 left-20 w-[2em]" /> */}
          <div className="sliderContainer">
            {/* <div className="divider" />
            <NavLink
              to={`/`}
              className="logoIcon absolute top-2 cursor-pointer"
            >
              <div
                className="z-[10000]"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img
                  src={
                    isHovering
                      ? "./images/LogoLanding.gif"
                      : "./images/LogoLanding.png"
                  }
                  className=" w-[4.5em] mt-2 ml-1"
                  alt="Logo"
                />
              </div>
            </NavLink> */}
            <div className="slider">
              <h1>Conversations With My Straight Boyfriends-</h1>
              <h1>Conversations With My Straight Boyfriends-</h1>
            </div>
          </div>

          {/* <p className="text-black text-sm inline-block ">Conversations With My Straight Boyfriends</p> */}
        </div>
        {/* debugging tool */}
        {/* <div className="grid grid-cols-2 gap-x-10 text-2xl justify-start pl-[40vw] fixed top-0 left-0 z-10">
                <p className="text-orange-500">pos.x: {pos.x / window.innerWidth * 100}</p>
                <p className="text-orange-500">pos.y: {pos.y / window.innerHeight * 100}</p>

                <p className="text-green-500">vw: {currCenter.currCenterX}</p>
                <p className="text-green-500">vh: {currCenter.currCenterY}</p>


                <p className="text-pink-600">{pos.isDragging ? "dragging" : "not dragging"}</p>
                <p className="text-pink-600">1vw in pixels: {oneViewWidth}</p>

                <p className="text-teal-900">offX: {pos.offX}</p>
                <p className="text-teal-900">offY: {pos.offY}</p>
            </div> */}
        <div
          className="absolute left-1/2 tansform -translate-x-1/2 translate-y-[75vh] z-[900]"
          onClick={() => handleRandomCentering()}
        >
          <DanceButton />
        </div>

        <div
          className="w-full h-[calc(100vh-120px)] overflow-hidden relative cursor-grab active:cursor-grabbing"
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
                  left: img.x + "vw",
                  top: img.y + "vh",
                  width: img.width + "vw",
                  height: "auto",
                  position: "absolute",
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
                    <img src={img.src} alt={img.alt || `image ${i}`} />
                  </NavLink>
                </nav>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="fixed -z-10 top-0">
          <LandingScene />
        </div>
      </div>
    </>
  );
}
