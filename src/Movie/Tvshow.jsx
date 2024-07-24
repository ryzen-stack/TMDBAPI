import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Tvshow.css'; 

function Tvshow() {
    const [tvshows, setTvshows] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getTvshows();
    }, []);

    const getTvshows = async () => {
        try {
            const { data } = await axios.get('https://api.themoviedb.org/3/discover/tv', {
                params: {
                    sort_by: 'popularity.desc',
                    api_key: '1cf50e6248dc270629e802686245c2c8'
                }
            });

            if (data.results.length === 0) {
                setTvshows([]);
                setError('TV shows not found.');
            } else {
                setTvshows(data.results);
                setError('');
            }
        } catch (error) {
            console.log('Error fetching TV shows:', error.message);
        }
    };

    const handleSearch = async () => {
        if (!searchTerm) {
            setError('Please enter a search term.');
            return;
        }

        try {
            const { data } = await axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                    api_key: '1cf50e6248dc270629e802686245c2c8',
                    query: searchTerm
                }
            });

            if (data.results.length === 0) {
                setTvshows([]);
                setError('No TV shows found.');
            } else {
                setTvshows(data.results);
                setError('');
            }
        } catch (error) {
            console.log('Error searching TV shows:', error.message);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <section>
            <div className='search-bar'>
                <input
                    type="text"
                    placeholder='Search TV show'
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className='movie'>
                {tvshows.map((tvshow, id) => (
                    <NavLink key={id} className='movie-details' to={`/tvshows/tvshowDetails/${tvshow.id}`}>
                        <div className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`} alt={tvshow.name} />
                            <div className='movie-info'>
                                <h4>{tvshow.name}</h4>
                                <p>Rating: {tvshow.vote_average}</p>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <h1 className='error'>{error}</h1>
        </section>
    );
}

export default Tvshow;
