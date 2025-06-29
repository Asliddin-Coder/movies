import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import MovieInfo from "../movie-info/movie-info";
import RowMoviesItem from "../row-movies-item/row-movies-item";
import "./row-movies.scss";
import Error from "../error/error";
import Spinner from "../spinner/spinner";
import useMovieService from "../../services/movie-service";
import { useLocation } from "react-router-dom";

const RowMovies = () => {

  const [open, setOpen] = useState(false)
  const [movies, setMovies] = useState([])
  const [movieId, setMovieId] = useState(null)
  const [page, setPage] = useState(1)

  const {pathname} = useLocation()
  
  const {getTrandingMovies, getPopularMovies, loading, error, clearError} = useMovieService();

  useEffect(() => {
    clearError(false)
    getMoreMovies()
  }, [])

  const onClose = () => setOpen(false);

  const onOpen = (id) => {
    setOpen(true)
    setMovieId(id)
  };

  const getTrendingMovies = (page) => {
    if(pathname === "/popular"){
      getPopularMovies(page).then((res) => setMovies(movies => [...movies, ...res]))
    }else{
      getTrandingMovies(page).then((res) => setMovies(movies => [...movies, ...res]))
    }
  };

  const getMoreMovies = () => {
    setPage(page => page + 1)
    getTrendingMovies(page)
  };

    const errorContent = error ? <Error /> : null;
    const loadingContent = loading ? <Spinner /> : null;

    return (
      <div className="rowmovies" >
        <div className="rowmovies__top">
          <div className="rowmovies__top-title">
            <img src="/tranding.svg" alt="" />
            <h1>{pathname === "/popular" ? "Popular" : "Tranding"}</h1>
          </div>
          <div className="hr" />
          <a href="#">See more</a>
        </div>
        {errorContent}
        {loadingContent}
        <Content movies={movies} onOpen={onOpen} />

        <div className="rowmovies__loadmore">
          <button className="btn btn-secondary" onClick={getMoreMovies}>
            Load More
          </button>
        </div>

        <Modal open={open} onClose={onClose}>
          <MovieInfo movieId={movieId} />
        </Modal>
      </div>
    );
}

export default RowMovies;

const Content = ({ movies, onOpen }) => {
  return (
    <>
      <div className="rowmovies__lists">
        {movies.map((movie) => (
          <RowMoviesItem key={movie.id} movie={movie} onOpen={onOpen} />
        ))}
      </div>
    </>
  );
};
