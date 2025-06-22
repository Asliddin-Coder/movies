import { useParams } from "react-router-dom";

const DetailtsPage = () => {
  let {movieId} = useParams();

  return <div>DetailtsPage: {movieId}</div>;
};

export default DetailtsPage;
