import axios from 'axios'
import React, { useState } from 'react'

function Search() {
    let [movie, setdata] = useState('')

    let [movies,setMovies] = useState([])
    let [error, setError] = useState('');


    let getmovie = ({ target: { value } }) => {
        setdata(value)
    }


    let searchMovie = async () => {
        try {
            
            let { data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1cf50e6248dc270629e802686245c2c8&query=${movie}`)
            
            let size = data.results
            if(size.length===0){
                
                setMovies([])
                setError("Movies not Found")
                
            }
            else{
                
                setMovies(data.results)
                setError('')
            }
           
        }
        catch (err) {
            console.log(err)

        }

    }

  return (
    <section>
        
        <div className='search-bar'>
                <input type="text" placeholder='search movie' onChange={getmovie} />
                <button onClick={searchMovie}>Search</button>
            </div>  
    </section>
  )
}

export default Search
