import React, { useEffect, useRef } from 'react';
import './cards.css';
import cards_data from '../../assets/cards/Cards_data';

const Card = ({ title, category }) => {
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleWheel);
    return () => {
      cardsRef.current.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="cards">
      <h2>{title ? title : 'Popular on Netflex'}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => (
          <div className="video" key={index}>
            <video
              src={card.video} // Change this to the correct property for your video source
              controls
              muted
              loop
              className="video-card"
            />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
