import "./movies.scss";
import { useState, useEffect } from "react";
import { fetchData } from "../helper/fetchData";
import { SortBox } from "../Components/SortBox";
import { GenresBox } from "../Components/GenresBox";
import { ShowMedia } from "../Components/ShowMedia";

export function Movies({ baseUrl, requestParams }) {

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const aa = await fetchData(`${baseUrl}/genre/movie/list${requestParams}`);
      setGenres(aa.genres);
    };
    fetchGenres();
  }, []);


  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState("discover/movie");
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

  useEffect(() => {
    const fetchGetMovies = async () => {
      const aa = await fetchData(
        `${baseUrl}${sort}${requestParams}&with_genres=${selectedGenres.join()}`
      );
      setMovies(aa.results);
    };
    fetchGetMovies();
  }, [sort, selectedGenres]);



  const handelClickSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="movie">
      <div className="movie__body">
        <section className="movie-title">Popular Movies</section>
        <section className="movie-content">
          <div className="movie-content-nav">
            <SortBox onChange={handelClickSort} value={sort} />

            <GenresBox
              genres={genres}
              selectedGenres={selectedGenres}
              onClick={getSelectedGenres}
            />
          </div>

          <div className="movie-content-box">
            <ShowMedia media={movies}/>

          </div>
        </section>
      </div>
    </div>
  );
}

