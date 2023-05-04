import './sortBox.scss'
import './genresBox.scss'

export function GenresBox({ genres, selectedGenres,onClick }) {

    return (
        
        <div className="genresBox sortBox">
        <h3>Genres</h3>
        <div>
          {genres.map((genre) => (
            <button
              key={genre.id}
              data-id={genre.id}
              data-name={genre.name}
              onClick={onClick}
              className={`genresBox__btn ${selectedGenres.includes(genre.id.toString())
                ? "genresBox__selected"
                : ""
                }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    );
}

