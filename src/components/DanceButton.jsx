import React, { useState } from "react";

export default function DanceButton() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <div
        className="z-[10000] cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={
            isHovering ? "./images/danceButton.gif" : "./images/danceButton.png"
          }
          className="w-[10em]"
          alt="Logo"
        />
      </div>
    </>
  );
}
