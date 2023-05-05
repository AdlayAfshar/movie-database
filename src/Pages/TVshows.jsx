// import "./movies.scss";
// import { useState, useEffect } from "react";

// export function TVshows({baseUrl, requestParams, baseHref, baseSrc}) {


//   const [genres, setGenres] = useState([]);
//   const fetchGenres = async () => {
//     const urlToFetch = `${baseUrl}/genre/tv/list${requestParams}`;
//     try {
//       const response = await fetch(urlToFetch);

//       if (response.ok) {
//         const jsonResponse = await response.json();
//         const genres = jsonResponse.genres;
//         setGenres(genres);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchGenres();
//   }, []);

//   const [tvs, setTvs] = useState(null);
//   const [sort, setSort] = useState("discover/tv");

//   const fetchGetTvs = async () => {
//     const urlToFetch = `${baseUrl}${sort}${requestParams}&with_genres=${selectedGenres.join()}`;
//     console.log({ urlToFetch });

//     try {
//       const response = await fetch(urlToFetch);

//       if (response.ok) {
//         const jsonResponse = await response.json();
//         const tvs = jsonResponse.results;
//         setTvs(tvs);
//         return tvs;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [selectedGenres, setSelectedGenres] = useState([]);

//   const getSelectedGenres = (e) => {
//     if (selectedGenres.includes(e.target.dataset.id)) {
//       setSelectedGenres((prev) =>
//         prev.filter((selected) => selected !== e.target.dataset.id)
//       );
//     } else {
//       setSelectedGenres([...selectedGenres, e.target.dataset.id]);
//     }
//   };

//   console.log({ selectedGenres });

//   useEffect(() => {
//     fetchGetTvs();
//   }, [sort, selectedGenres]);



//   const handelClickSort = (e) => {
//     setSort(e.target.value);
//   };


//   return (
//     <div className="movie">
//       <div className="movie__body">
//         <section className="movie-title">
//           Top Rated Movies or Popular Movies
//         </section>
//         <section className="movie-content">
//           <div className="movie-content-nav">
//             <div className="nav-sort">
//               <h3 className="nav-sort__label">Sort Results By</h3>
//               <select
//                 name="sort"
//                 className="nav-sort__select"
//                 onChange={handelClickSort}
//                 value={sort}
//               >
//                 <option value="discover/tv">All</option>
//                 <option value="tv/popular">Popularity</option>
//                 <option value="tv/top_rated">Rating</option>
//               </select>
//             </div>

//             <div className="nav-genres">
//               <h3>Genres</h3>
//               <div
          
//               >
//                 {genres.map((genre) => (
//                   <button
//                     key={genre.id}
//                     data-id={genre.id}
//                     data-name={genre.name}
//                     onClick={getSelectedGenres}
//                     className={`nav-genres-btn ${
//                       selectedGenres.includes(genre.id.toString())
//                         ? "nav-genres__selected"
//                         : ""
//                     }`}
//                   >
//                     {genre.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
           
//           </div>

//           <div className="movie-content-box">
//             <div className="movie-content-box-card">
//               {tvs?.map((tv) => (
//                 <div className="card">
//                   <div className="card-img">
//                     <a href={baseHref + "tv/" + tv.id + "-" + tv.name}>
//                       <img
//                         src={baseSrc + tv.poster_path}
//                         alt={tv.title}
//                       />
//                     </a>
//                   </div>

//                   <div className="card-content">
//                     <div className="card-content__rate">
//                       {tv.vote_average.toFixed(1)}
//                     </div>
//                     <h2>
//                       <a href={baseHref + "tv/" + tv.backdrop_path}>
//                         {tv.title}
//                         {tv.name}
//                       </a>
//                     </h2>
//                     <p>
//                       {" "}
//                       {tv.release_date}
//                       {tv.first_air_date}{" "}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }


import "./movies.scss";
import { useState, useEffect } from "react";
import { fetchData } from "../helper/fetchData";
import { SortBox } from "../Components/SortBox";
import { GenresBox } from "../Components/GenresBox";
import { ShowMedia } from "../Components/ShowMedia";

export function TVshows({ baseUrl, requestParams }) {

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const result = await fetchData(`${baseUrl}/genre/tv/list${requestParams}`);
      setGenres(result.genres);
    };
    fetchGenres();
  }, []);


  const [tvShows, setTvShows] = useState([]);
  const [sort, setSort] = useState("discover/tv");
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
    const fetchGetTvShows = async () => {
      const aa = await fetchData(
        `${baseUrl}${sort}${requestParams}&with_genres=${selectedGenres.join()}`
      );
      setTvShows(aa.results);
    };
    fetchGetTvShows();
  }, [sort, selectedGenres, baseUrl, requestParams]);



  const handelClickSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="movie">
      <div className="movie__body">
        <section className="movie-title">Popular TV Shows</section>
        <section className="movie-content">
          <div className="movie-content-nav">
            <SortBox onChange={handelClickSort} value={sort} />

            <GenresBox
              genres={genres}
              selectedGenres={selectedGenres}
              onClick={getSelectedGenres}
            />
          </div>

          <div>
            <ShowMedia media={tvShows} path="tv" className="movie-content-box"/>

          </div>
        </section>
      </div>
    </div>
  );
}

