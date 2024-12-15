import React, { useEffect, useState } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import TextContent from "./TextContent";
import SnapScrollContainer from "./containers/SnapscrollContainer";
import { NavLink } from "react-router-dom";
import ContentModel from "./shaders/ContentModel";
import PageIndex from "./PageIndex";
import VideoContent from "./VideoContent";
import Bg0 from "./shaders/ContentScene";
import Bg1 from "./shaders/Bg1.jsx";
import Bg2 from "./shaders/Bg2.jsx";
import Bg3 from "./shaders/Bg3.jsx";
import Bg4 from "./shaders/Bg4.jsx";
import Bg5 from "./shaders/Bg5.jsx";
import Bg6 from "./shaders/Bg6.jsx";
import Bg7 from "./shaders/Bg7.jsx";
import { cityContent } from "./textContentData";

//this is the dynamic content page

export default function ContentComponent({ images }) {
  const { city } = useParams();
  const cityList = [
    { itemCity: "Pittsburgh", bg: Bg1 },
    { itemCity: "New York", bg: Bg2 },
    { itemCity: "Los Angeles", bg: Bg3 },
    { itemCity: "Chicago", bg: Bg7 },
    { itemCity: "Sydney", bg: Bg4 },
    { itemCity: "Providence", bg: Bg5 },
    { itemCity: "Suwanee", bg: Bg6 },
  ];
  const currentCityContent = cityContent[city]["performances"];
  console.log(currentCityContent[0]);
  const [opacityVal, setOpacityVal] = useState(1);
  const vidList = images.find((e) => e.city === city).vidList;
  console.log(vidList[0]);

  const oneViewWidth = window.innerWidth / 100;
  const oneViewHeight = window.innerHeight / 100;

  let pageImagesIndex = 0;

  for (let i = 0; i < images.length; i++) {
    if (images[i].city === city) {
      pageImagesIndex = i;
    }
  }
  console.log("this is the curr index:" + pageImagesIndex);

  function calculateRelativePositions(images, referenceIndex = 0) {
    const referenceImage = images[referenceIndex];

    return images.map((image, index) => {
      if (index === referenceIndex) {
        return { ...image, relativeX: 0, relativeY: 0 };
      }

      return {
        ...image,
        relativeX: image.x - referenceImage.x,
        relativeY: image.y - referenceImage.y,
      };
    });
  }

  const imagesWithRelativePositions = calculateRelativePositions(
    images,
    pageImagesIndex
  );
  console.log(imagesWithRelativePositions, "lol");
  const newImages = imagesWithRelativePositions.filter(
    (im) => im.city !== city
  );
  const newImagesWithoutOverlap = newImages.filter(
    (obj) => Math.abs(obj.relativeX) > 80 || Math.abs(obj.relativeY) > 100
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeout(() => {
        setOpacityVal((prevOpacity) => {
          if (prevOpacity <= 0) {
            clearInterval(timer);
            return 0;
          }
          return Math.max(prevOpacity - 0.005, 0);
        });
      }, 800);
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const [isHovering, setIsHovering] = useState(false);

  //////////////////////////////////////////////////////////////////////////

  const [scope, animate] = useAnimate();

  useEffect(() => {
    const staggerMenuItems = stagger(0.1, { startDelay: 0.5 });

    animate(
      ".animateDiv",
      { opacity: [0, 0.5], scale: [0, 1], rotate: [0, 360] },
      {
        duration: 0.5,
        delay: staggerMenuItems,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }
    );
  }, []);

  const [vidVisible, setVidVisible] = useState(false);

  const handleClick = () => {
    setVidVisible(!vidVisible);
  };

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <NavLink to={`/`} className="logoIcon fixed top-2">
          <div
            className="z-[10000]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img
              src={
                isHovering
                  ? "./images/dance3White.gif"
                  : "./images/dance3WhiteThumb.png"
              }
              className=" w-[6em]"
              alt="Logo"
            />
          </div>
        </NavLink>
        {/* <div className="relative w-full h-screen -z-[6]"> */}
        {opacityVal > 0 && (
          <div
            ref={scope}
            className="absolute top-1/2 left-1/2 tansform -translate-x-1/2"
          >
            {newImagesWithoutOverlap.map((eachIm, index) => (
              <div
                className="animateDiv"
                key={index}
                style={{
                  left: eachIm.relativeX * 4 + oneViewWidth,
                  top: eachIm.relativeY * 2.7 + oneViewHeight,
                  width: (eachIm.width * oneViewWidth) / 5,
                  position: "absolute",
                  opacity: opacityVal,
                }}
              >
                <NavLink key={`nav-${index}`} to={eachIm.link}>
                  <img src={eachIm.src} />
                </NavLink>
              </div>
            ))}
          </div>
        )}
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
              <div className="flex mx-auto mt-10">
                <p
                  // style={{ fontFamily: "Typefesse_Pleine" }}
                  className="text-xl"
                >
                  {city}
                </p>
              </div>
              <div className="flex space-y-52 -my-15 overflow-hidden">
                <div className="flex h-screen">
                  {console.log(window.innerWidth)}
                  {window.innerWidth > 600 ? (
                    <div className="flex flex-row items-center justify-center gap-x-20 gap-y-8 my-auto w-full">
                      {/* Text content container */}
                      <div className="flex w-full">
                        <SnapScrollContainer isScrollRight={false}>
                          {currentCityContent.map((item) => (
                            <div>
                              <TextContent
                                author={item["author"]}
                                performer={item["performer"]}
                                choreo={item["choreo"]}
                                body={item["body"]}
                              />
                            </div>
                          ))}
                        </SnapScrollContainer>
                      </div>

                      {/* Video content container */}
                      <div className="flex w-full">
                        <SnapScrollContainer isScrollRight={true}>
                          {currentCityContent.map((_, i) => (
                            <div>
                              <VideoContent vidRef={vidList[i]} />
                            </div>
                          ))}
                        </SnapScrollContainer>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 items-center justify-center gap-x-20 gap-y-8 my-auto w-full">
                      {/* Text content container */}
                      <div
                        onClick={handleClick}
                        className="flex w-full pointer-events-auto"
                      >
                        <div
                          className={`fixed w-full left-1/2 top-3/5 -translate-x-1/2 -translate-y-1/2 ${
                            vidVisible ? "z-10" : "z-8 opacity-50"
                          }`}
                        >
                          <SnapScrollContainer isScrollRight={false}>
                            {currentCityContent.map((_, i) => (
                              <div>
                                <VideoContent vidRef={vidList[i]} />
                              </div>
                            ))}
                          </SnapScrollContainer>
                        </div>
                        <div
                          className={`fixed left-1/2 top-3/5 -translate-x-1/2 -translate-y-1/2 z-9 ${
                            vidVisible ? "opacity-20" : ""
                          }`}
                        >
                          <SnapScrollContainer isScrollRight={false}>
                            {currentCityContent.map((item) => (
                              <div>
                                <TextContent
                                  author={item["author"]}
                                  performer={item["performer"]}
                                  choreo={item["choreo"]}
                                  body={item["body"]}
                                />
                              </div>
                            ))}
                          </SnapScrollContainer>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -z-10 top-0">
          {cityList.map(({ itemCity, bg: Bg }, index) =>
            itemCity == city ? <Bg /> : null
          )}
        </div>
      </div>
    </>
  );
}
