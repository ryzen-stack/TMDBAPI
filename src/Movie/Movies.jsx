
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './movie.css';
import { NavLink } from 'react-router-dom';

function Movies() {
    let [movies, setMovies] = useState([]);
    let [error, setError] = useState('');
    let [searchTerm, setSearchTerm] = useState('');

    const apiKey = '1cf50e6248dc270629e802686245c2c8';
    const baseUrl = 'https://api.themoviedb.org/3';

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/discover/movie`, {
                params: {
                    sort_by: 'popularity.desc',
                    api_key: apiKey
                }
            });
            setMovies(data.results);
        } catch (error) {
            console.log('Error fetching movies:', error.message);
        }
    };

    const searchMovie = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/search/movie`, {
                params: {
                    api_key: apiKey,
                    query: searchTerm
                }
            });
            if (data.results.length === 0) {
                setMovies([]);
                setError('Movies not found.');
            } else {
                setMovies(data.results);
                setError('');
            }
        } catch (err) {
            console.log('Error searching movie:', err);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <section>
            <div className="search-bar">
                <input type="text" placeholder="Search movie" value={searchTerm} onChange={handleInputChange}/>
                <button onClick={searchMovie}>Search</button>
            </div>
            <div className="movie">
                {movies.map((movie, id) => (
                    <NavLink
                        key={id}
                        className="movie-details"
                        to={`/movies/movieDetails/${movie.title}`}>
                        <div className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className="movie-info">
                                <h4>{movie.title}</h4>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <h1 className="error">{error}</h1>
        </section>
    );
}

export default Movies;
