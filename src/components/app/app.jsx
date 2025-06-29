import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "../error-boundary/error-boundary";
import Navbar from "../navbar/navbar";
import HomePage from "../../pages/home-page";
import Spinner from "../spinner/spinner";

const NotFoundPage = lazy(() => import("../../pages/not-found-page"))
const TrandingPage = lazy(() => import("../../pages/tranding-page"))
const PopularPage = lazy(() => import("../../pages/popular-page"))
const DetailsPage = lazy(() => import("../../pages/detailed-page"))

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/tranding" element={<TrandingPage/>} />
          <Route path="/popular" element={<PopularPage/>} />
          <Route path="/movie/:movieId" element={<DetailsPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
