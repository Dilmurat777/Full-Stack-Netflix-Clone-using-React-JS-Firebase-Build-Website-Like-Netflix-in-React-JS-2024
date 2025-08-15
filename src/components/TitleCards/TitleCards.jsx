import './TitleCards.css';
import cards_data from './../../assets/cards/Cards_data';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const cardRef = useRef();
  const [dataMovie, setDataMovie] = useState([]);
 

  

  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDhhNWI1NDRhMjUwYjAwNzgxYTE4N2NiNTUxYWY4ZiIsIm5iZiI6MTcwMDQwODI1MC42Mywic3ViIjoiNjU1YTJiYmFlYTg0YzcxMDkxMGRmYTk2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.EMPXknb7GH7SSro3nqfo3vhc9AhNnwGKCcGiurTmiy4',
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((res) => setDataMovie(res.results))
      .catch((err) => console.error(err));
    cardRef.current.addEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardRef}>
        {dataMovie.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} key={index} className="card">
              <img  src={`https://image.tmdb.org/t/p/w200/`+card.poster_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
