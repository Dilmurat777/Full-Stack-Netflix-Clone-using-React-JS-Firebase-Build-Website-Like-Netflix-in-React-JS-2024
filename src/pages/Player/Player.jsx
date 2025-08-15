import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '',
  });
  const { id } = useParams();
  const navigate = useNavigate()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDhhNWI1NDRhMjUwYjAwNzgxYTE4N2NiNTUxYWY4ZiIsIm5iZiI6MTcwMDQwODI1MC42Mywic3ViIjoiNjU1YTJiYmFlYTg0YzcxMDkxMGRmYTk2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.EMPXknb7GH7SSro3nqfo3vhc9AhNnwGKCcGiurTmiy4',
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img onClick={() => navigate(-2)} src={back_arrow_icon} alt="" />
      <iframe
        width="90%"
        height="90%"
        title="trailer"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        frameBorder="0"
        allowFullScreen></iframe>
      <div className="play-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
