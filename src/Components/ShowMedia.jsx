import "./showMedia.scss";

export function ShowMedia({ media, path, className }) {
    const baseSrc = "https://image.tmdb.org/t/p/w440_and_h660_face/";
    const baseHref = "https://www.themoviedb.org/";
  return (
    <div className="showMedia">
      <div className={className}>
              {media.map((movie) => (
                <div className="card">
                  <div className="card-img">
                    <a href={baseHref + path + movie.id + "-" + movie.name}>
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
                      <a href={baseHref + path + "/" + movie.backdrop_path}>
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
  );
}
