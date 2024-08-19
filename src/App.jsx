import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import './App.css'
import LandingComponent from './components/LandingComponent'
import ContentComponent from './components/ContentComponent'
import RootLoayout from './components/layouts/RootLayout'

export default function App() {

  const images = [
    {
      src: '/images/im3.png',
      link: '/Pittsburgh',
      x: 100,
      y: 200,
      width: 20,
      height: 15,
      alt: 'Description of image 1',
      description: 'Pittsburgh PA'
    },
    {
      src: '/images/im3.png',
      link: '/NewYork',
      x: 400,
      y: 300,
      width: 20,
      height: 15,
      alt: 'Description of image 2',
      description: 'New York NY'
    },
    {
      src: '/images/im3.png',
      link: '/LA',
      x: 300,
      y: 600,
      width: 20,
      height: 15,
      alt: 'Description of image 1',
      description: 'Los Angeles CA'
    },
    {
      src: '/images/im3.png',
      link: '/Chicago',
      x: 800,
      y: 300,
      width: 20,
      height: 15,
      alt: 'Description of image 2',
      description: 'Chicago IL'
    },
    {
      src: '/images/im3.png',
      link: '/Sydney',
      x: -100,
      y: -200,
      width: 20,
      height: 15,
      alt: 'Description of image 1',
      description: 'Sydney'
    },
    {
      src: '/images/im3.png',
      link: '/Providence',
      x: -400,
      y: 300,
      width: 20,
      height: 15,
      alt: 'Description of image 2',
      description: 'Providence RD'
    },
    {
      src: '/images/im3.png',
      link: '/Suwanee',
      x: 700,
      y: -250,
      width: 20,
      height: 15,
      alt: 'Description of image 2',
      description: 'Suwanee GA'
    },
    // ... other images
  ];

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLoayout />}>
        <Route index element={<LandingComponent images={images} />} />
        <Route path=":city" element={<ContentComponent />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

