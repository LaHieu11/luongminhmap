import React from 'react';
import './LocationCard.css';

const LocationCard = ({ location }) => {
  const handleOpenGoogleMaps = () => {
    window.open(location.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="location-card">
      <div className="card-image-container">
        <img
          src={location.image}
          alt={location.name}
          className="card-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
          }}
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{location.name}</h3>
        <p className="card-address">{location.address}</p>
        <button
          className="card-button"
          onClick={handleOpenGoogleMaps}
        >
          Mở Google Maps
        </button>
      </div>
    </div>
  );
};

export default LocationCard;

