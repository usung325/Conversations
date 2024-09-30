import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import LandingComponent from '../Outadted-LandingComponent'

export default function RootLayout() {

    return (
        <>


            <main>
                <Outlet />
            </main>
        </>
    )
}