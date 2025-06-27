import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "../error-boundary/error-boundary";
import Hero from "../hero/hero";
import Navbar from "../navbar/navbar";
import RowMovies from "../row-movies/row-movies";
import HomePage from "../../pages/home-page";
import TvPage from "../../pages/tv-page";
import NotFoundPage from "../../pages/not-found-page";
import DetailedPage from "../../pages/detailed-page";


const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/tv" element={<TvPage/>} />
        <Route path="/movie/:movieId" element={<DetailedPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
