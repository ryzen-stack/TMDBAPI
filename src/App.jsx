import React from 'react'
import Movies from './Movie/Movies'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MovieDeatails from './MovieDeatails'
import Nav from './Movie/Nav'
import Tvshow from './Movie/Tvshow'
import Search from './Movie/Search'

function App() {
  return (
   
      <BrowserRouter>
      <Nav/>
      <Routes>
      <Route path='/' element={<Movies/>}/>
      <Route path='/Tvshow' element={<Tvshow/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/movies/movieDetails/:pid' element={<MovieDeatails/>}/>

      </Routes>
      </BrowserRouter>
  
  )
}

export default App
