import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import MovieService from "../../services/movie-service";
import MovieInfo from "../movie-info/movie-info";
import RowMoviesItem from "../row-movies-item/row-movies-item";
import "./row-movies.scss";
import Error from "../error/error";
import Spinner from "../spinner/spinner";
import useMovieService from "../../services/movie-service";

const RowMovies = () => {

  const [open, setOpen] = useState(false)
  const [movies, setMovies] = useState([])
  const [movieId, setMovieId] = useState(null)
  const [page, setPage] = useState(1)
  
  const {getTrandingMovies, loading, error, clearError} = useMovieService();

  useEffect(() => {
    getMoreMovies()
  }, [])

  const onClose = () => setOpen(false);

  const onOpen = (id) => {
    setOpen(true)
    setMovieId(id)
  };

  const getTrendingMovies = (page) => {
    clearError(false)
    getTrandingMovies(page).then((res) => setMovies(movies => [...movies, ...res]))
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
            <h1>Trending</h1>
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
