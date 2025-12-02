import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LocationCard.css';

const LocationCard = ({ location }) => {
  const navigate = useNavigate();

  const handleOpenGoogleMaps = () => {
    window.open(location.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleViewDetails = () => {
    navigate(`/location/${location.id}`);
  };

  // Ưu tiên hiển thị ảnh chính (location.image), sau đó mới đến fallbackImage
  const getImageSrc = () => {
    // Ưu tiên 1: Ảnh chính (location.image) - có thể là URL, đường dẫn, hoặc base64
    if (location.image) {
      return location.image;
    }
    // Ưu tiên 2: Ảnh đầu tiên trong mảng images nếu có
    if (location.images && location.images.length > 0) {
      return location.images[0];
    }
    // Ưu tiên 3: Fallback image
    if (location.fallbackImage) {
      return location.fallbackImage;
    }
    // Cuối cùng: Placeholder
    return 'https://via.placeholder.com/400x250?text=No+Image';
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
        <div className="card-buttons">
          <button
            className="card-button primary"
            onClick={handleViewDetails}
          >
            Xem chi tiết
          </button>
          <button
            className="card-button secondary"
            onClick={handleOpenGoogleMaps}
          >
            Mở Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;

