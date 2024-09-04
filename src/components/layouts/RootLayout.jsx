import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import LandingComponent from '../LandingComponent'


export default function RootLayout() {
    return (
        <>
            <NavLink to={`/`}>
                <div className="absolute left-1/2 ransform -translate-x-1/2 w-full text-center top-5  z-[900]">
                    <img src="./images/Logo.png" className="absolute top-5 left-20 w-[2em]" />
                </div>
            </NavLink>

            <main>
                <Outlet />
            </main>
        </>

    )
}