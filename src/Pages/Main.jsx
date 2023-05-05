import "./main.scss";
import { Header } from "../Layouts/Header";
import { SearchLanding } from "../Layouts/SearchLanding";
// import { Trend } from "../Layouts/Trend";
import { Trending } from "../Layouts/Trending";
// import { Popular } from "../Layouts/Popular";
import {TVshows} from "./TVshows"
import { Movies } from "./Movies";
// import {Movies} from "./Movies"


export function Main() {
  const baseUrl = "https://api.themoviedb.org/3/";
  const apiKey = "ffa300523873658c0dc98283306a3c45";
  const requestParams = `?api_key=${apiKey}`;

  return (
    <div className="main">
      <div className="main__header">
        <Header />
      </div>

      <div className="main__body">
        <section className="main__body-section">
          <SearchLanding className="main__body-section1"  baseUrl={baseUrl} requestParams={requestParams}/>
        </section>
        <section className="main__body-section">
          <Trending className="main__body-section1"  baseUrl={baseUrl} requestParams={requestParams} />
        </section>
        {/* <section className="main__body-section">
          <Popular className="main__body-section1"  baseUrl={baseUrl} requestParams={requestParams}/>
        </section> */}
        {/* <section className="main__body-section">
          <Trend className="main__body-section1" />
          <Trending className="main__body-section1" />
        </section>
        <section className="main__body-section">
          <Trend className="main__body-section1" />
          <Trending className="main__body-section1" />
        </section>
        <section className="main__body-section">
          <Trend className="main__body-section1" />
          <Trending className="main__body-section1" />
        </section> */}

        
      </div>

      <Movies baseUrl={baseUrl} requestParams={requestParams} />
      <TVshows baseUrl={baseUrl} requestParams={requestParams} />


    </div>
  );
}

