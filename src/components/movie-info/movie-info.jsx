import { useState, useEffect} from "react";
import "./movie-info.scss";
import MovieService from "../../services/movie-service";
import Spinner from "../spinner/spinner";
import Error from "../error/error";
import useMovieService from "../../services/movie-service";
import { useNavigate } from "react-router-dom";

const MovieInfo = ({movieId}) => {

  const [movie, setMovie] = useState(null)

  const {getDetailedMovie, loading, error, clearError} = useMovieService();

  useEffect(() => {
    updateMovie()
  }, [movieId])

  const updateMovie = () => {
      getDetailedMovie(movieId).then((res) => setMovie(res))
  };

    const errorContent = error ? <Error /> : null;
    const loadingContent = loading ? <Spinner /> : null;
    const content = !(error || loading || !movie) ? <Content movie={movie} /> : null;

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
  const navigate = useNavigate()
  return (
    <>
      <img src={movie.backdrop_path} alt="img" />

      <div className="hero__movie-descr">
        <h2>{movie.name}</h2>
        <p>{movie.description}</p>
      </div>
      <button className="btn btn-light" onClick={() => navigate(`/movie/${movie.id}`)}>Details</button>
    </>
  );
};
