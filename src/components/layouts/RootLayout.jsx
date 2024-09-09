import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import LandingComponent from '../LandingComponent'

export default function RootLayout() {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <NavLink to={`/`}>
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-full text-center top-5 z-[10000]"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <img
                        src={isHovering ? "./images/dance2.gif" : "./images/LogoGif.png"}
                        className="absolute top-0 left-5 w-[5em]"
                        alt="Logo"
                    />
                </div>
            </NavLink >

            <main>
                <Outlet />
            </main>
        </>
    )
}