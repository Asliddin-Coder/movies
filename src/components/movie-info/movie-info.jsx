import { useState, useEffect} from "react";
import "./movie-info.scss";
import MovieService from "../../services/movie-service";
import Spinner from "../spinner/spinner";
import Error from "../error/error";

const MovieInfo = ({movieId}) => {

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)


  const movieService = new MovieService();

  useEffect(() => {
    updateMovie()
  }, [movieId])

  const updateMovie = () => {
    if (!movieId) {
      setError(true);
    }

    setLoading(true)

    movieService
      .getDetailedMovie(movieId)
      .then((res) => setMovie(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

    const errorContent = error ? <Error /> : null;
    const loadingContent = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <Content movie={movie} /> : null;

    return (
      <div className="movieinfo">
        {errorContent}
        {loadingContent}
        {content}
      </div>
    );
}

export default MovieInfo;

const Content = ({ movie }) => {
  return (
    <>
      <img src={movie.backdrop_path} alt="img" />

      <div className="hero__movie-descr">
        <h2>{movie.name}</h2>
        <p>{movie.description}</p>
      </div>
    </>
  );
};
