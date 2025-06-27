import { useParams } from "react-router-dom";

const DetailedPage = () => {
  let {movieId} = useParams();

  return <div>DetailtsPage: {movieId}</div>;
};

export default DetailedPage;
