import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import { createBrowserRouter, RouterProvider, createRoutesFromElements, BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import LandingComponent from './components/LandingComponent'
import ContentComponent from './components/ContentComponent'
import RootLayout from './components/layouts/RootLayout'
import { Analytics } from "@vercel/analytics/react"
import DragLayout from './components/layouts/DragLayout'

export default function App() {

  const images = [
    {
      src: '/images/elephant.png',
      link: '/Pittsburgh',
      city: 'Pittsburgh',
      x: -10,
      y: -10,
      width: 20,
      height: 'auto',
      alt: 'Description of image 1',
      description: 'Pittsburgh PA',
      vidList: ['vid1.mp4', 'vid1.mp4', 'vid2.mp4']
    },
    {
      src: '/images/pigeon2.png',
      link: '/New York',
      city: 'New York',
      x: 40,
      y: 130,
      width: 20,
      height: 'auto',
      alt: 'Description of image 2',
      description: 'New York NY',
      vidList: ['vid2.mp4', 'vid1.mp4', 'vid3.mp4']
    },
    {
      src: '/images/woopie.png',
      link: '/Los Angeles',
      city: 'Los Angeles',
      x: 60,
      y: -100,
      width: 20,
      height: 'auto',
      alt: 'Description of image 1',
      description: 'Los Angeles CA',
      vidList: ['vid3.mp4', 'vid3.mp4', 'vid1.mp4']
    },
    {
      src: '/images/hammer.png',
      link: '/Chicago',
      city: 'Chicago',
      x: 130,
      y: 0,
      width: 20,
      height: 'auto',
      alt: 'Description of image 2',
      description: 'Chicago IL',
      vidList: ['vid3.mp4', 'vid3.mp4', 'vid3.mp4']
    },
    {
      src: '/images/teacup.png',
      link: '/Sydney',
      city: 'Sydney',
      x: -120,
      y: 20,
      width: 20,
      height: 'auto',
      alt: 'Description of image 1',
      description: 'Sydney',
      vidList: ['vid1.mp4', 'vid2.mp4', 'vid3.mp4']
    },
    {
      src: '/images/grape.png',
      link: '/Providence',
      city: 'Providence',
      x: -130,
      y: -60,
      width: 20,
      height: 'auto',
      alt: 'Description of image 2',
      description: 'Providence RD',
      vidList: ['vid2.mp4', 'vid2.mp4', 'vid3.mp4']
    },
    {
      src: '/images/shirt.png',
      link: '/Suwanee',
      city: 'Suwanee',
      x: -20,
      y: -140,
      width: 15,
      height: 'auto',
      alt: 'Description of image 2',
      description: 'Suwanee GA',
      vidList: ['vid3.mp4', 'vid1.mp4', 'vid1.mp4']
    },
    // ... other images
  ];

  // const router = createBrowserRouter(

  //   createRoutesFromElements(
  //     <Route path="/" element={<RootLayout />}>
  //       <Route index element={<DragLayout images={images} />} />
  //       <Route path=":city" element={<ContentComponent images={images} />} />
  //     </Route>
  //   )
  // )

  const location = useLocation()
  return (
    <>

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<DragLayout images={images} />} />
          <Route path=":city" element={<ContentComponent images={images} />} />
        </Route>
      </Routes>


      {/* <RouterProvider router={router} />
      <Analytics /> */}
    </>
  )
}

