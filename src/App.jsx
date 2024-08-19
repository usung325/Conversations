import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import './App.css'
import LandingComponent from './components/LandingComponent'
import ContentComponent from './components/ContentComponent'
import RootLayout from './components/layouts/RootLayout'

export default function App() {

  const images = [
    {
      src: '/images/im3.png',
      link: '/Pittsburgh',
      city: 'Pittsburgh',
      x: 100,
      y: 200,
      width: 20,
      height: 15,
      alt: 'Description of image 1',
      description: 'Pittsburgh PA',
      vidList: ['vid1.mp4', 'vid1.mp4', 'vid2.mp4']
    },
    {
      src: '/images/im3.png',
      link: '/New York',
      city: 'New York',
      x: 400,
      y: 300,
      width: 20,
      height: 15,
      alt: 'Description of image 2',
      description: 'New York NY',
      vidList: ['vid2.mp4', 'vid1.mp4', 'vid3.mp4']
    },
    {
      src: '/images/im3.png',
      link: '/Los Angeles',
      city: 'Los Angeles',
      x: 300,
      y: 600,
      width: 20,
      height: 15,
      alt: 'Description of image 1',
      description: 'Los Angeles CA',
      vidList: ['vid3.mp4', 'vid3.mp4', 'vid1.mp4']
    },
    {
      src: '/images/im3.png',
      link: '/Chicago',
      city: 'Chicago',
      x: 800,
      y: 300,
      width: 20,
      height: 15,
      alt: 'Description of image 2',
      description: 'Chicago IL',
      vidList: ['vid3.mp4', 'vid3.mp4', 'vid3.mp4']
    },
    {
      src: '/images/im3.png',
      link: '/Sydney',
      city: 'Sydney',
      x: -100,
      y: -200,
      width: 20,
      height: 15,
      alt: 'Description of image 1',
      description: 'Sydney',
      vidList: ['vid1.mp4', 'vid2.mp4', 'vid3.mp4']
    },
    {
      src: '/images/im3.png',
      link: '/Providence',
      city: 'Providence',
      x: -400,
      y: 300,
      width: 20,
      height: 15,
      alt: 'Description of image 2',
      description: 'Providence RD',
      vidList: ['vid2.mp4', 'vid2.mp4', 'vid3.mp4']
    },
    {
      src: '/images/im3.png',
      link: '/Suwanee',
      city: 'Suwanee',
      x: 700,
      y: -250,
      width: 20,
      height: 15,
      alt: 'Description of image 2',
      description: 'Suwanee GA',
      vidList: ['vid3.mp4', 'vid1.mp4', 'vid1.mp4']
    },
    // ... other images
  ];

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingComponent images={images} />} />
        <Route path=":city" element={<ContentComponent images={images} />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

