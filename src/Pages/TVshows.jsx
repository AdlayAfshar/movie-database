import "./movies.scss";
// import "../Layouts/SearchLanding.scss"
import { useState, useEffect } from "react";
// import { Header } from "../Layouts/Header";

export function TVshows() {
  const baseUrl = "https://api.themoviedb.org/3/";
  const apiKey = "ffa300523873658c0dc98283306a3c45";
  const requestParams = `?api_key=${apiKey}`;

  const [genres, setGenres] = useState([]);
  const fetchGenres = async () => {
    const urlToFetch = `${baseUrl}/genre/tv/list${requestParams}`;
    try {
      const response = await fetch(urlToFetch);

      if (response.ok) {
        const jsonResponse = await response.json();
        const genres = jsonResponse.genres;
        setGenres(genres);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);

  const [tvs, setTvs] = useState(null);
  const [sort, setSort] = useState("discover/tv");

  const fetchGettvs = async () => {
    const urlToFetch = `${baseUrl}${sort}${requestParams}&with_genres=${selectedGenres.join()}`;
    console.log({ urlToFetch });

    try {
      const response = await fetch(urlToFetch);

      if (response.ok) {
        const jsonResponse = await response.json();
        const tvs = jsonResponse.results;
        setTvs(tvs);
        return tvs;
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  console.log({ selectedGenres });

  useEffect(() => {
    // console.log({sort});
    fetchGettvs();
  }, [sort, selectedGenres]);



  const handelClickSort = (e) => {
    // console.log(e)
    setSort(e.target.value);
  };


  // console.log({ selectedFlavors });
  const baseSrc = "https://image.tmdb.org/t/p/w440_and_h660_face/";
  const baseHref = "https://www.themoviedb.org/";

  return (
    <div className="movie">
      {/* <div className="movie__header">
        <Header />
      </div> */}
      <div className="movie__body">
        <section className="movie-title">
          Top Rated Movies or Popular Movies
        </section>
        <section className="movie-content">
          <div className="movie-content-nav">
            <div className="nav-sort">
              <h3 className="nav-sort__label">Sort Results By</h3>
              <select
                name="sort"
                className="nav-sort__select"
                onChange={handelClickSort}
                value={sort}
              >
                <option value="discover/tv">All</option>
                <option value="tv/popular">Popularity</option>
                <option value="tv/top_rated">Rating</option>
              </select>
            </div>

            <div className="nav-genres">
              <h3>Genres</h3>
              <div
              // multiple={true}
              // value={selectedFlavors}
              // onChange={(e) => {
              //     handleSelect(e.target);
              // }}
              >
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    data-id={genre.id}
                    data-name={genre.name}
                    onClick={getSelectedGenres}
                    className={`nav-genres-btn ${
                      selectedGenres.includes(genre.id.toString())
                        ? "nav-genres__selected"
                        : ""
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
            {/* <div className="nav-genres-show">
              {selectedGenres.map((genre) => (
                <button >{genre}</button>
              ))}
            </div> */}
          </div>

          <div className="movie-content-box">
            <div className="movie-content-box-card">
              {tvs?.map((tv) => (
                <div className="card">
                  <div className="card-img">
                    <a href={baseHref + "tv/" + tv.id + "-" + tv.name}>
                      <img
                        src={baseSrc + tv.poster_path}
                        alt={tv.title}
                      />
                    </a>
                  </div>

                  <div className="card-content">
                    <div className="card-content__rate">
                      {tv.vote_average.toFixed(1)}
                    </div>
                    <h2>
                      <a href={baseHref + "tv/" + tv.backdrop_path}>
                        {tv.title}
                        {tv.name}
                      </a>
                    </h2>
                    <p>
                      {" "}
                      {tv.release_date}
                      {tv.first_air_date}{" "}
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
