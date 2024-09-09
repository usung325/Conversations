import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import './App.css'
import LandingComponent from './components/LandingComponent'
import ContentComponent from './components/ContentComponent'
import RootLayout from './components/layouts/RootLayout'
import { Analytics } from "@vercel/analytics/react"

export default function App() {

  const images = [
    {
      src: '/images/elephant.png',
      link: '/Pittsburgh',
      city: 'Pittsburgh',
      x: -1200,
      y: 200,
      width: 300,
      height: 'auto',
      alt: 'Description of image 1',
      description: 'Pittsburgh PA',
      vidList: ['vid1.mp4', 'vid1.mp4', 'vid2.mp4']
    },
    {
      src: '/images/pigeon2.png',
      link: '/New York',
      city: 'New York',
      x: 200,
      y: 300,
      width: 300,
      height: 'auto',
      alt: 'Description of image 2',
      description: 'New York NY',
      vidList: ['vid2.mp4', 'vid1.mp4', 'vid3.mp4']
    },
    {
      src: '/images/woopie.png',
      link: '/Los Angeles',
      city: 'Los Angeles',
      x: 300,
      y: 1300,
      width: 300,
      height: 'auto',
      alt: 'Description of image 1',
      description: 'Los Angeles CA',
      vidList: ['vid3.mp4', 'vid3.mp4', 'vid1.mp4']
    },
    {
      src: '/images/hammer.png',
      link: '/Chicago',
      city: 'Chicago',
      x: 1800,
      y: 300,
      width: 300,
      height: 'auto',
      alt: 'Description of image 2',
      description: 'Chicago IL',
      vidList: ['vid3.mp4', 'vid3.mp4', 'vid3.mp4']
    },
    {
      src: '/images/teacup.png',
      link: '/Sydney',
      city: 'Sydney',
      x: -500,
      y: -800,
      width: 300,
      height: 'auto',
      alt: 'Description of image 1',
      description: 'Sydney',
      vidList: ['vid1.mp4', 'vid2.mp4', 'vid3.mp4']
    },
    {
      src: '/images/grape.png',
      link: '/Providence',
      city: 'Providence',
      x: -800,
      y: 800,
      width: 300,
      height: 'auto',
      alt: 'Description of image 2',
      description: 'Providence RD',
      vidList: ['vid2.mp4', 'vid2.mp4', 'vid3.mp4']
    },
    {
      src: '/images/shirt.png',
      link: '/Suwanee',
      city: 'Suwanee',
      x: 1000,
      y: -550,
      width: 300,
      height: 'auto',
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
      <Analytics />
    </>
  )
}

