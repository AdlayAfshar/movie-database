// import "./searchBar.scss";

export function SearchBar({ onSubmit, onChange, searchKey }) {
  return (
    <div className="searchBar">
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={searchKey}
          className="form__input"
        />

        <div className="form__btn-group">
          <button className="form__btn"> Search </button>
        </div>
      </form>
    </div>
  );
}
