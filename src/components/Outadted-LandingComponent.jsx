import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { NavLink, Link, useNavigate } from "react-router-dom";
import LandingScene from "./shaders/LandingScene";
import DanceButton from "./DanceButton";
//
const LandingComponent = ({ images = [] }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 600, y: 300 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoveredImage, setHoveredImage] = useState(null);

  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  const [isWrapping, setIsWrapping] = useState(false);
  const navigate = useNavigate();

  const [currCenter, setCurrCenter] = useState([]);
  const [lastCenteredXY, setLastCenteredXY] = useState({ x: 0, y: 0 });

  const possibleUrls = [
    "/Los Angeles",
    "/Pittsburgh",
    "/New York",
    "/Sydney",
    "/Providence",
    "/Chicago",
  ];

  const findCenterIm = () => {
    let centeredIm = document.elementsFromPoint(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    // centeredIm.forEach(div => { div.tagName === 'IMG' ? setCurrCenter(div) : null })
    // setCurrCenter(centeredIm)
    centeredIm.forEach((div) =>
      div.className.includes("imgDiv")
        ? (setCurrCenter(div.id),
          console.log(div),
          console.log(div.getBoundingClientRect()),
          setLastCenteredXY({
            x: div.getBoundingClientRect().x,
            y: div.getBoundingClientRect().y,
          }))
        : null
    );
  };

  const handleRandomNavigation = useCallback(
    (e) => {
      e.preventDefault();
      const randomIndex = Math.floor(Math.random() * possibleUrls.length);
      const randomUrl = possibleUrls[randomIndex];
      navigate(randomUrl);
    },
    [navigate, possibleUrls]
  );

  const handleMouseDown = (e) => {
    if (e.target.tagName.toLowerCase() === "img") return;
    setIsDragging(true);
    setStartPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      if ((velocity.x < 0.1) | (velocity.y < 0.1)) {
        return;
      } else {
        const newOffset = {
          x: offset.x - velocity.x,
          y: offset.y - velocity.y,
        };
        setOffset(newOffset);
      }
    }

    const newOffset = {
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    };
    setOffset(newOffset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setVelocity({ x: 1, y: 1 });
  };

  useEffect(() => {
    const container = containerRef.current;
    container.style.cursor = isDragging ? "grabbing" : "grab";
    findCenterIm();
  }, [isDragging]);

  useEffect(() => {
    if ((velocity.x > 0.01) | (velocity.y > 0.01)) {
      setVelocity((prevVelocity) => ({
        x: prevVelocity.x * 0.1,
        y: prevVelocity.y * 0.1,
      }));
      console.log(velocity);
    }
  }, [velocity]);

  useEffect(() => {
    const hOffset = 0;
    const wOffset = 0;

    let newOffset = { ...offset };
    let wrapping = false;

    if (offset.y > window.innerHeight) {
      newOffset.y = -window.innerHeight + hOffset;
      wrapping = true;
    } else if (offset.y < -window.innerHeight) {
      newOffset.y = window.innerHeight - hOffset;
      wrapping = true;
    }

    if (offset.x > window.innerWidth) {
      newOffset.x = -window.innerWidth + wOffset;
      wrapping = true;
    } else if (offset.x < -window.innerWidth) {
      newOffset.x = window.innerWidth - wOffset;
      wrapping = true;
    }

    if (wrapping) {
      setIsWrapping(true);
      setOffset(newOffset);
      // Reset wrapping state after a short delay
      setTimeout(() => setIsWrapping(false), 50);
    }
  }, [offset]);

  return (
    <>
      <div className="absolute left-1/2 tansform -translate-x-1/2 w-full text-center top-5  z-[900]">
        {/* <img src="./images/Logo.png" className="absolute top-5 left-20 w-[2em]" /> */}
        <p> {currCenter} </p>
        {/* <p className="text-black text-sm inline-block ">Conversations With My Straight Boyfriends</p> */}
      </div>
      <Link to="#" onClick={handleRandomNavigation}>
        <div className="absolute left-1/2 tansform -translate-x-1/2 translate-y-[75vh] z-[900]">
          <DanceButton />
        </div>
      </Link>
      <div
        ref={containerRef}
        className="w-full h-screen overflow-hidden relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: isWrapping ? "none" : "transform 0.2s ease-out",
          }}
        >
          {images.map((img, index) => (
            <motion.div
              whileHover={{ scale: 1.5 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
              key={index}
              className="absolute imgDiv"
              id={"img" + index}
              style={{
                left: img.x,
                top: img.y,
                width: img.width,
                height: img.height,
              }}
              onMouseEnter={() => setHoveredImage(img)}
              onMouseLeave={() => setHoveredImage(null)}
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
                    alt={img.alt || `Image ${index}`}
                    className="w-full h-full object-cover"
                  />
                </NavLink>
              </nav>
              {hoveredImage === img && img.description && (
                <div className="absolute bottom-0 left-24 right-0 top-64 text-white p-2 text-lg w-[300px]">
                  <p className="hitespace-nowrap overflow-hidden text-overflow-ellipsis">
                    {img.description}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute -z-10 top-0">
        <LandingScene />
      </div>
    </>
  );
};

export default LandingComponent;
