import "./trending.scss";
import { useState, useEffect } from "react";

export const Trending = ({ className }) => {
    const media = ["all", "movie", "tv"];
    const [time, setTime] = useState("day");
    const baseUrl = "https://api.themoviedb.org/3/";
    const apiKey = "ffa300523873658c0dc98283306a3c45";
    const requestParams = `?api_key=${apiKey}`;

    const [results, setResults] = useState(null);

    const fetchData = async () => {
        const urlToFetch = `${baseUrl}/trending/${media[0]}/${time}${requestParams}`;
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
    }, [time]);

    const handelClick = (e) => {
        e.target.dataset.id === "week" ? setTime("day") : setTime("week");
    };

    console.log({ results });
    const img = `https://image.tmdb.org/t/p/w440_and_h660_face/`;

    return (
        <div className="trending className">
            <div className="trending-header">
                <h2 className="trending-header__title">Trending</h2>
                <div className="trending-header__selector">
                    <h3>
                        <button data-id='day' onClick={handelClick}>
                            today
                        </button>      
                    </h3>

                    <h3>
                        <button data-id='week' onClick={handelClick}>
                            this week
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
                                </a>
                            </h2>
                            <p> {user.release_date} </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
