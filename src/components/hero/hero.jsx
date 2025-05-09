import { useEffect, useState} from "react";
import MovieService from "../../services/movie-service";
import Error from "../error/error";
import Spinner from "../spinner/spinner";
import PropTypes from "prop-types";
import "./hero.scss";

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const movieService = new MovieService();

  useEffect(() => {
	getMovie()
  }, []);

  const getMovie = () => {
    movieService
      .getRandomMovie()
      .then((res) => setMovie(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  const errorContent = error ? <Error /> : null;
  const loadingContent = loading ? <Spinner /> : null;
  const content = !(error || loading) ? <Content movie={movie} /> : null;

  return (
    <div className="hero">
      <div className="hero__info">
        <h2>FIND MOVIES</h2>
        <h1>TV shows and more</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sunt
          necessitatibus veritatis labore provident similique neque praesentium
          debitis maiores. Nihil consectetur, veniam labore magnam ab similique
          optio perferendis error earum.
        </p>
        <button className="btn btn-primary">Details</button>
      </div>
      <div className="hero__movie">
        {errorContent}
        {loadingContent}
        {content}
      </div>
    </div>
  );
};

export default Hero;

const Content = ({ movie }) => {
  return (
    <>
      <img src={movie.backdrop_path} alt="img" />

      <div className="hero__movie-descr">
        <h2>{movie.name}</h2>
        <p>
          {movie.description && movie.description.length >= 250
            ? `${movie.description.slice(0, 250)}...`
            : movie.description}
        </p>
        <div>
          <button className="btn btn-secondary">Random movie</button>
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </>
  );
};

Content.propTypes = {
  movie: {
    backdrop_path: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  },
};
