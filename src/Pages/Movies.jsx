import "./movies.scss";
import { useState, useEffect } from "react";
import { fetchData } from "../helper/fetchData";
import { SortBox } from "../Layouts/SortBox";
import { GenresBox } from "../Layouts/GenresBox";

export function Movies({ baseUrl, requestParams, baseHref, baseSrc }) {
  // const baseUrl = "https://api.themoviedb.org/3/";
  // const apiKey = "ffa300523873658c0dc98283306a3c45";
  // const requestParams = `?api_key=${apiKey}`;

  const [genres, setGenres] = useState([]);

  // const fetchGenres = async () => {
  //   const urlToFetch = `${baseUrl}/genre/movie/list${requestParams}`;
  //   try {
  //     const response = await fetch(urlToFetch);

  //     if (response.ok) {
  //       const jsonResponse = await response.json();
  //       const genres = jsonResponse.genres;
  //       setGenres(genres);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    const fetchGenres = async () => {
      const aa = await fetchData(`${baseUrl}/genre/movie/list${requestParams}`);
      setGenres(aa.genres);
    };
    fetchGenres();
  }, []);

  const [movies, setMovies] = useState(null);
  const [sort, setSort] = useState("discover/movie");

  // const fetchGetMovies = async () => {
  //   const urlToFetch = `${baseUrl}${sort}${requestParams}&with_genres=${selectedGenres.join()}`;
  //   console.log({ urlToFetch });

  //   try {
  //     const response = await fetch(urlToFetch);

  //     if (response.ok) {
  //       const jsonResponse = await response.json();
  //       const movies = jsonResponse.results;
  //       setMovies(movies);
  //       return movies;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [selectedGenres, setSelectedGenres] = useState([]);

  const getSelectedGenres = (e) => {
    if (selectedGenres.includes(e.target.dataset.id)) {
      setSelectedGenres((prev) =>
        prev.filter((selected) => selected !== e.target.dataset.id)
      );
    } else {
      setSelectedGenres([...selectedGenres, e.target.dataset.id]);
    }
  };

  // console.log({ selectedGenres });

  useEffect(() => {
    const fetchGetMovies = async () => {
      const aa = await fetchData(
        `${baseUrl}${sort}${requestParams}&with_genres=${selectedGenres.join()}`
      );
      setMovies(aa.results);
    };
    fetchGetMovies();
  }, [sort, selectedGenres]);

  // const [selectedGenres, setSelectedGenres] = useState([]);
  // const getSelectedGenres = (e) => {
  //     setSelectedGenres([...selectedGenres, e.target.dataset.id])
  //     console.log({selectedGenres});
  //     setWithGenres( `&with_genres=${ selectedGenres.length > 0 ? selectedGenres.join() + "," + e.target.dataset.id : e.target.dataset.id}`);

  // };

  // const [selectedFlavors, setSelectedFlavors] = useState([]);

  // const handleSelect = function (selectedItems) {
  //     const flavors = [];
  //     for (let i = 0; i < selectedItems.length; i++) {
  //         flavors.push(selectedItems[i].value);
  //     }
  //     setSelectedFlavors(flavors);
  // };

  // const popularMV =     'https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1'
  // const topRateMV =     'https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1'
  // const discover  =     'https://api.themoviedb.org/3/discover/movie?api_key=ffa300523873658c0dc98283306a3c45'

  // const handelClickSort = (e) => {
  //     e.target.dataset.id === "rating" ? setSort("movie/top_rated") : setSort("movie/popular");
  // };

  const handelClickSort = (e) => {
    setSort(e.target.value);
  };

  // console.log({ selectedFlavors });
  // const baseSrc = "https://image.tmdb.org/t/p/w440_and_h660_face/";
  // const baseHref = "https://www.themoviedb.org/";

  return (
    <div className="movie">
      <div className="movie__body">
        <section className="movie-title">Popular Movies</section>
        <section className="movie-content">
          <div className="movie-content-nav">
            <SortBox onChange={handelClickSort} value={sort} />

            {/* <div className="nav-sort">
              <h3 className="nav-sort__label">Sort Results By</h3>
              <SortResults
                className="nav-sort__select"
                onChange={handelClickSort}
                value={sort} />
            </div> */}

            {/* <div className="nav-genres">
              <h3>Genres</h3>
              <div>
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    data-id={genre.id}
                    data-name={genre.name}
                    onClick={getSelectedGenres}
                    className={`nav-genres-btn ${selectedGenres.includes(genre.id.toString())
                      ? "nav-genres__selected"
                      : ""
                      }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div> */}
            <GenresBox
              genres={genres}
              selectedGenres={selectedGenres}
              onClick={getSelectedGenres}
            />
          </div>

          <div className="movie-content-box">
            <div className="movie-content-box-card">
              {movies?.map((movie) => (
                <div className="card">
                  <div className="card-img">
                    <a href={baseHref + "movie/" + movie.id + "-" + movie.name}>
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
