import React, { useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import more from './more.png'
import { supabase } from '../client'; // Assuming you have a Supabase client instance

const Card = (props) => {
  const [upvotes, setUpvotes] = useState(props.upvotes);

  const handleUpvoteClick = async () => {
    // Increment upvotes locally
    setUpvotes(upvotes + 1);

    // Update upvotes in the database
    const { data, error } = await supabase
      .from('Crewmates')
      .update({ upvotes: upvotes + 1 })
      .eq('id', props.id);

    if (error) {
      console.error('Error updating upvotes:', error.message);
    }
  };

  return (
    <div className="Card">
      <Link to={'edit/' + props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
      <p className="content">{props.created_at}</p>
      <Link to={`/Post/${props.id}`}>
        <h2 className="title">{props.title}</h2>
      </Link>
      <h3 className="content" style={{cursor:"pointer"}} onClick={handleUpvoteClick}>{upvotes + " upvotes"}</h3>
    </div>
  );
};

export default Card;
