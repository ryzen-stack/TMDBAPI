import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Movie/movieDeatails.css'

function MovieDeatails() {

  let {pid} = useParams()
  

  let [movies,setmovies] = useState([])
  
  let getMovies = async () => {
    try {
        let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1cf50e6248dc270629e802686245c2c8&query=${pid}`);
        
        setmovies(data.results)
        
      
    } catch (error) {
        console.log(error.message);
    }
};

let searchMovie = movies.filter(movie=>movie.title===pid)
console.log(searchMovie)

useEffect(() => {
    getMovies();
    

}, []);

  return (
    <div className='movie-container'>
      {searchMovie.map((movie,id)=>{
         return <div className='movieDetails' key={id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} height="200px" width="250px" alt={movie.title} />
          <h4>Movie:{movie.title} <span>Rating:{parseInt(movie.vote_average)}</span></h4>
          <h5>Language: {movie.original_language}</h5>
          <h5>release_date: {movie.release_date}</h5>
          <h5>popularity:{movie.popularity}</h5>
          <p>overview: {movie.overview}</p>

         </div>
      })}
    
      
    </div>
  )
}

export default MovieDeatails
