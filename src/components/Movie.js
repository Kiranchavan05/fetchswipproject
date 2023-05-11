import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  
  const delteHandler = async () => {
    try {
      const response = await fetch(
        `https://react-http-e3022-default-rtdb.firebaseio.com/movies/${props.id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      props.ondelete(props.id);

      console.log('deleted id is', props.id)
      
    }catch(error){
        console.log(error);
    }
    
  };

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button style={{background:'red'}} onClick={delteHandler}>Delete</button>
    </li>
  );
};

export default Movie;
