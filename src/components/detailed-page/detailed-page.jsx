import { useParams } from "react-router-dom";
import useMovieService from "../../services/movie-service";
import { useEffect, useState} from "react";
import Error from "../error/error";
import Spinner from "../spinner/spinner";
import "../detailed-page/detailed-page.scss"

const DetailedPage = () => {
const [movie, setMovie] = useState(null)

const {movieId} = useParams()

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
      <>
        {errorContent}
        {loadingContent}
        {content}
      </>
    );
};

export default DetailedPage;

const Content = ({ movie }) => {
  return (
    <>
      <div className="detailed-page">
        <div className="detailed-page__img">
          <img
            src={movie.poster_path}
            alt={movie.name}
          />
        </div>

        <div className="detailed-page__description">
          <h1>{movie.name}</h1>
          <p>
            {movie.description}
          </p>
          <div className="detailed-page__description__info">
            <img src="/date.svg" alt="" />
            <p>{movie.release_date}</p>
            <div className="dot" />
            <p>{movie.vote_average.toFixed(1)}</p>
            <img src="/star.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
