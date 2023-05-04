
export function SortResults({ value, onChange, className }) {

  return (
    <div>
              <select
                name="sort"
                className={className}
                onChange={onChange}
                value={value}
              >
                <option value="discover/movie">All</option>
                <option value="movie/popular">Popularity</option>
                <option value="movie/top_rated">Rating</option>
              </select>
          
    </div>
  );
}

