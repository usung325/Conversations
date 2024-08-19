import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import LandingComponent from '../LandingComponent'


export default function RootLoayout() {
    return (
        <>

            <main>

                <Outlet />
            </main>
        </>

    )
}