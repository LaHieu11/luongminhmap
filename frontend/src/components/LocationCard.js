import React from 'react';
import './LocationCard.css';

const LocationCard = ({ location }) => {
  const handleOpenGoogleMaps = () => {
    window.open(location.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  // Sử dụng ảnh local nếu có, nếu không thì dùng fallbackImage hoặc placeholder
  const getImageSrc = () => {
    if (location.image && location.image.startsWith('/images/')) {
      return location.image;
    }
    return location.fallbackImage || location.image || 'https://via.placeholder.com/400x250?text=No+Image';
  };

  return (
    <div className="location-card">
      <div className="card-image-container">
        <img
          src={getImageSrc()}
          alt={location.name}
          className="card-image"
          onError={(e) => {
            // Nếu ảnh local không tải được, thử fallbackImage
            if (location.fallbackImage && e.target.src !== location.fallbackImage) {
              e.target.src = location.fallbackImage;
            } else {
              e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
            }
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

