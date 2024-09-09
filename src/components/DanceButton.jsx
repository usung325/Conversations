import React, { useState } from 'react'

export default function DanceButton() {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>

            <div
                className="z-[10000]"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <img
                    src={isHovering ? "./images/dance2.gif" : "./images/LogoGif.png"}
                    className="w-[10em]"
                    alt="Logo"
                />
            </div>

        </>
    )
}