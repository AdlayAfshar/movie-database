// import { MovieCard } from '../Components/MovieCard';
import './searchLanding.scss';
import { useState } from "react";

export const SearchLanding = () => {

    const [searchKey, setSearchKey] = useState('');

    const baseUrl = "https://api.themoviedb.org/3/";
    const apiKey = "ffa300523873658c0dc98283306a3c45";
    const requestParams = `?api_key=${apiKey}`;

    const [results, setResults] = useState([]);

    // const fetchDiscover = async () => {
    //     const urlToFetch = `${baseUrl}discover/movie${requestParams}`;
    //     try {
    //         const response = await fetch(urlToFetch);

    //         if (response.ok) {
    //             const jsonResponse = await response.json();
    //             const results = jsonResponse.results;
    //             setResults(results);
    //             return results;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    const fetchSearchMovie = async (searchKey) => {
        const urlToFetch = `${baseUrl}search/movie${requestParams}&query=${searchKey}`;
        try {
            const response = await fetch(urlToFetch);

            if (response.ok) {
                const jsonResponse = await response.json();
                const results = jsonResponse.results;
                setResults([...results]);
                return results;
            }
        } catch (error) {
            console.log(error);
        }
    };



    const fetchSearchTv = async (searchKey) => {
        const urlToFetch = `${baseUrl}search/tv${requestParams}&query=${searchKey}`;
        try {
            const response = await fetch(urlToFetch);

            if (response.ok) {
                const jsonResponse = await response.json();
                const results = jsonResponse.results;
                setResults([...results]);
                return results;
            }
        } catch (error) {
            console.log(error);
        }
    };




    // useEffect(() => {
    //     fetchDiscover();
    //     eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // const renderMovie = () => {
    //     // debugger
    //     results.map((movie) => (
    //         // <MovieCard 
    //         // key={movie.id}
    //         // movie={movie} />

    //             <h2>
    //                 {movie.title}
    //                 hi
    //             </h2>


    //     ))
    // }


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

    console.log({ results });
    const baseSrc = 'https://image.tmdb.org/t/p/w440_and_h660_face/';
    const baseHref = 'https://www.themoviedb.org/';



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
            <p>
                {searchKey}
                {/* {renderMovie()} */}
            </p>
            <div className="searchLanding-card">
                {results.filter((movie) => movie.poster_path).map((movie) => (
                    <div className="card">
                        <div className="card-img">
                            <a href={baseHref + 'tv/' + movie.id + '-' + movie.name}
                            //  href={baseHref + 'tv/' + movie.backdrop_path}
                            >
                                <img src={baseSrc + movie.poster_path} alt={movie.title} />
                            </a>
                        </div>

                        <div className="card-content">
                            <div className="card-content__rate">
                                {movie.vote_average.toFixed(1)}
                            </div>
                            <h2>
                                <a href={baseHref + 'movie' + movie.backdrop_path}>
                                    {movie.title}
                                    {movie.name}
                                </a>
                            </h2>
                            <p> {movie.release_date}
                                {movie.first_air_date} </p>
                        </div>
                    </div>
                ))}
            </div>






        </div>
    )
}