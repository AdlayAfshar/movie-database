import './header.scss';
// import { Main } from '../Pages/Main'
// import { Movies } from '../Pages/Movies'
// import { TVshows } from '../Pages/TVshows'
// import { Search } from '../Components/Search'


export function Header() {

  return (
    <div className="header">
      <a href='kk'>
        {/* <Main> */}
        <div> main </div>
        {/* </Main> */}
      </a>
      <a href='kk'>
        {/* <Movies> */}
        <div> Movies </div>
        {/* </Movies> */}
      </a>


      {/* <TVshows />  
      <Search /> */}
      
      
      <div> TVshows </div>
      <input type="search" />

    </div>
  );
}
