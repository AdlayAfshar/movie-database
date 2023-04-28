import "./movies.scss";
// import "../Layouts/SearchLanding.scss"
import { useState, useEffect } from "react";
import { Header } from "../Layouts/Header";
// import { SearchLanding } from "../Layouts/SearchLanding";
// import { Trend } from "../Layouts/Trend";
// import { Trending } from "../Layouts/Trending";
// import { Popular } from "../Layouts/Popular";

export function Movies() {
  // const [time, setTime] = useState("day");
  // const [media, setMedia] = useState("all");
  const baseUrl = "https://api.themoviedb.org/3/";
  const apiKey = "ffa300523873658c0dc98283306a3c45";
  const requestParams = `?api_key=${apiKey}`;

  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    // const urlToFetch = `${baseUrl}/genre/movie/list${requestParams}`;
    const urlToFetch =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=ffa300523873658c0dc98283306a3c45&language=en-US";
    try {
      const response = await fetch(urlToFetch);

      if (response.ok) {
        const jsonResponse = await response.json();
        //const genres = jsonResponse.results; ? const genres = jsonResponse.genres;
        const genres = jsonResponse.genres;
        setGenres(genres);
        // return genres;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);

  const [movies, setMovies] = useState(null);
  const [withGenres, setWithGenres] = useState("");
  const fetchGetMovies = async () => {
    const urlToFetch = `${baseUrl}/discover/movie${requestParams}${withGenres}`;
    try {
      const response = await fetch(urlToFetch);

      if (response.ok) {
        const jsonResponse = await response.json();
        //const movies = jsonResponse.results; ? const movies = jsonResponse.movies;
        const movies = jsonResponse.results;
        setMovies(movies);
        return movies;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetMovies();
  }, [withGenres]);

  // const [movieInfo, setMovieInfo] = useState(null);
  // const fetchGetMovieInfo = async (movie) => {
  //     const movieId = movie.id;
  //     const urlToFetch = `${baseUrl}/movie/${movieId}${requestParams}`;
  //     try {
  //         const response = await fetch(urlToFetch);

  //         if (response.ok) {
  //             const jsonResponse = await response.json();
  //             //const movieInfo = jsonResponse.results; ? const movieInfo = jsonResponse.movieInfo;
  //             const movieInfo = jsonResponse.results;
  //             setMovieInfo(movieInfo);
  //             return movieInfo;
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  // useEffect(() => {
  //     fetchGetMovieInfo();
  // });

  const getSelectedGenres = (e) => {
    // debugger
    setWithGenres(`&with_genres=${e.target.dataset.id}`);
    // alert('hshgjh')
   
  };

//   useEffect(() => {
//       setWithGenres();
//   }, []);


  // const popularTV =
  //     "https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1";
  // const topRateTV =
  //     "https://api.themoviedb.org/3/tv/top_rated?api_key=<<api_key>>&language=en-US&page=1";

  // const handelClickSort = (e) => {
  //     e.target.dataset.id === "week" ? setTime("day") : setTime("week");
  // };

  // const handelClickGenres = (e) => {
  //     switch (e.target.dataset.id) {
  //         case 'all':
  //             setMedia("all");
  //             break;
  //         case 'movie':
  //             setMedia("movie");
  //             break;
  //         case 'tv':
  //             setMedia("tv");
  //             break;
  //         default:
  //             setMedia("all");
  //     }
  // };

  // console.log({ movies });
  console.log({ withGenres });
  const baseSrc = "https://image.tmdb.org/t/p/w440_and_h660_face/";
  const baseHref = "https://www.themoviedb.org/";

  return (
    <div className="movie">
      <div className="movie__header">
        <Header />
      </div>
      <div className="movie__body">
        <section className="movie-title">
          Top Rated Movies or Popular Movies
        </section>
        <section className="movie-content">
          <div className="movie-content-nav">
            <div className="nav-sort">
              <h3 className="nav-sort__label">Sort Results By</h3>
              <select name="sort" className="nav-sort__select">
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div className="nav-genres">
              <h3>Genres</h3>
              {genres.map((genre) => (
                <button
                  data-id={genre.id}
                  onClick={getSelectedGenres}
                  className="nav-genres-btn"
                >
                  {genre.name}
                </button>
              ))}
            </div>

            <button className="nav-btn">search</button>
          </div>

          <div className="movie-content-box">
            <div className="movie-content-box-card">
              {movies?.map((movie) => (
                <div className="card">
                  <div className="card-img">
                    <a
                      href={baseHref + "tv/" + movie.id + "-" + movie.name}
                      //  href={baseHref + 'tv/' + movie.backdrop_path}
                    >
                      <img
                        src={baseSrc + movie.poster_path}
                        alt={movie.title}
                      />
                    </a>
                  </div>

                  <div className="card-content">
                    <div className="card-content__rate">
                      {movie.vote_average.toFixed(1)}
                    </div>
                    <h2>
                      <a href={baseHref + "movie/" + movie.backdrop_path}>
                        {movie.title}
                        {movie.name}
                      </a>
                    </h2>
                    <p>
                      {" "}
                      {movie.release_date}
                      {movie.first_air_date}{" "}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// export default Main;
