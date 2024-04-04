import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import more from './more.png'

const Card = (props) => {
  return (
    <div className="Card">
      <Link to={'edit/' + props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
      <Link to={`/crewmate/${props.id}`}>
        <h2 className="name">{props.name}</h2>
      </Link>
      <h3 className="speed">{props.speed + " mph"}</h3>
      <h3 className="speed">{props.color}</h3>
    </div>
  );
};

export default Card;
