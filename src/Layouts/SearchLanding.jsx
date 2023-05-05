// import { MovieCard } from '../Components/MovieCard';
import './searchLanding.scss';
import { useState } from "react";
import { fetchData } from "../helper/fetchData";
import { ShowMedia } from '../Components/ShowMedia';

export const SearchLanding = ({ baseUrl, requestParams}) => {

    const [searchKey, setSearchKey] = useState('');
    const [results, setResults] = useState([]);

    const fetchSearchMovie = async (searchKey) => {
        const urlToFetch = `${baseUrl}search/movie${requestParams}&query=${searchKey}`;
        const results = await fetchData(urlToFetch)
        setResults([...results.results]);
    }

    const fetchSearchTv = async (searchKey) => {
        const urlToFetch = `${baseUrl}search/tv${requestParams}&query=${searchKey}`;
        const results = await fetchData(urlToFetch)
        setResults([...results.results]);
    }

    const handleChange = ({ target }) => {
        setSearchKey(target.value);
    }



    const searchMovie = (e) => {
        //prevents page refresh
        e.preventDefault();
        fetchSearchMovie(searchKey);
        fetchSearchTv(searchKey);
        setSearchKey('');

    }

    // console.log({ results });
    // const baseSrc = 'https://image.tmdb.org/t/p/w440_and_h660_face/';
    // const baseHref = 'https://www.themoviedb.org/';



    return (
        <div className="searchLanding">
            <div className="searchLanding-title">
                <h2>SEARCh.</h2>
                <h3> Millions of movies, TV shows and people to discover. Explore now.</h3>
            </div>


            <form className='form' onSubmit={searchMovie}>

                <input type='text' onChange={handleChange} value={searchKey} className='form__input' />

                <div className='form__btn-group'>

                    <button className='form__btn'> Search </button>

                </div>

            </form>
            {/* <p>
                {searchKey}
            </p> */}


            <ShowMedia media={results} path={results.media_type} className="searchLanding-card" />






        </div>
    )
}