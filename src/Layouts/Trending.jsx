import "./trending.scss";
import { useState, useEffect } from "react";
import { fetchData } from "../helper/fetchData";
import { ShowMedia } from "../Components/ShowMedia";

export const Trending = ({ baseUrl, requestParams }) => {
  const [time, setTime] = useState("day");
  const [media, setMedia] = useState("all");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const urlToFetch = `${baseUrl}/trending/${media}/${time}${requestParams}`;
      const results = await fetchData(urlToFetch);
      setResults(results.results);
    };
    fetchGenres();
  }, [time, media]);

  const handelClickTime = (e) => {
    e.target.dataset.id === "week" ? setTime("day") : setTime("week");
  };

  const handelClickMedia = (e) => {
    switch (e.target.dataset.id) {
      case "all":
        setMedia("all");
        break;
      case "movie":
        setMedia("movie");
        break;
      case "tv":
        setMedia("tv");
        break;
      default:
        setMedia("all");
    }
  };

  return (
    <div className="trending className">
      <div className="trending-header">
        <h2 className="trending-header__title">Trending</h2>
        <div className="trending-header__selector">
          <h3>
            <button data-id="day" onClick={handelClickTime}>
              Today
            </button>
          </h3>

          <h3>
            <button data-id="week" onClick={handelClickTime}>
              This week
            </button>
          </h3>
        </div>

        <div className="trending-header__selector">
          <h3>
            <button data-id="all" onClick={handelClickMedia}>
              All
            </button>
          </h3>

          <h3>
            <button data-id="movie" onClick={handelClickMedia}>
              Movies
            </button>
          </h3>

          <h3>
            <button data-id="tv" onClick={handelClickMedia}>
              Tv
            </button>
          </h3>
        </div>
      </div>

      <ShowMedia media={results} path={results.media_type} className="trending-content"/>
    </div>
  );
};
