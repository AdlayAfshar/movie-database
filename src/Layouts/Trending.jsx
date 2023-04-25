import "./trending.scss";
import { useState, useEffect } from "react";

export const Trending = ({ className }) => {
    // const media = ["all", "movie", "tv"];
    const [time, setTime] = useState("day");
    const [media, setMedia] = useState("all");
    const baseUrl = "https://api.themoviedb.org/3/";
    const apiKey = "ffa300523873658c0dc98283306a3c45";
    const requestParams = `?api_key=${apiKey}`;

    const [results, setResults] = useState(null);

    const fetchData = async () => {
        const urlToFetch = `${baseUrl}/trending/${media}/${time}${requestParams}`;
        try {
            const response = await fetch(urlToFetch);

            if (response.ok) {
                const jsonResponse = await response.json();
                const results = jsonResponse.results;
                setResults(results);
                return results;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [time, media]);

    const handelClickTime = (e) => {
        e.target.dataset.id === "week" ? setTime("day") : setTime("week");
    };

    const handelClickMedia = (e) => {
        switch(e.target.dataset.id) {
            case 'all':
                setMedia("all");
                break;
            case 'movie':
                setMedia("movie");
                break;
            case 'tv':
                setMedia("tv");
                break;
            default:
                setMedia("all");
        }
    };

    console.log({ results });
    const img = `https://image.tmdb.org/t/p/w440_and_h660_face/`;

    return (
        <div className="trending className">
            <div className="trending-header">
                <h2 className="trending-header__title">Trending</h2>
                <div className="trending-header__selector">
                    <h3>
                        <button data-id='day' onClick={handelClickTime}>
                            Today
                        </button>
                    </h3>

                    <h3>
                        <button data-id='week' onClick={handelClickTime}>
                            This week
                        </button>
                    </h3>
                </div>

                <div className="trending-header__selector">
                    <h3>
                        <button data-id='all' onClick={handelClickMedia}>
                            All
                        </button>
                    </h3>

                    <h3>
                        <button data-id='movie' onClick={handelClickMedia}>
                            Movies
                        </button>
                    </h3>

                    <h3>
                        <button data-id='tv' onClick={handelClickMedia}>
                            Tv
                        </button>
                    </h3>
                </div>

            </div>

            <div className="trending-content">
                {results?.map((user) => (
                    <div className="card">
                        <div className="card-img">
                            <a href="https://www.themoviedb.org/tv/82856-the-mandalorian">
                                <img src={img + user.poster_path} alt={user.title} />
                            </a>
                        </div>

                        <div className="card-content">
                            <div className="card-content__rate">
                                {user.vote_average.toFixed(1)}
                            </div>
                            <h2>
                                <a href="https://www.themoviedb.org/tv/82856-the-mandalorian">
                                    {user.title}
                                    {user.name}
                                </a>
                            </h2>
                            <p> {user.release_date} 
                            {user.first_air_date} </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
