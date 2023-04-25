import "./main.scss";
import { Header } from "../Layouts/Header";
import { SearchLanding } from "../Layouts/SearchLanding";
import { Trend } from "../Layouts/Trend";
import { Trending } from "../Layouts/Trending";
import { Popular } from "../Layouts/Popular";

export function Main() {
  return (
    <div className="main">
      <div className="main__header">
        <Header />
      </div>
      <div className="main__body">
        <section className="main__body-section">
          <SearchLanding className="main__body-section1" />
        </section>
        <section className="main__body-section">
          {/* <Trend className="main__body-section1" /> */}
          <Trending className="main__body-section1" />
        </section>
        <section className="main__body-section">
          <Popular className="main__body-section1" />
        </section>
        <section className="main__body-section">
          <Trend className="main__body-section1" />
          {/* <Trending className="main__body-section1" /> */}
        </section>
        <section className="main__body-section">
          {/* <Trend className="main__body-section1" /> */}
          <Trending className="main__body-section1" />
        </section>
        <section className="main__body-section">
          {/* <Trend className="main__body-section1" /> */}
          <Trending className="main__body-section1" />
        </section>
      </div>
    </div>
  );
}

// export default Main;
