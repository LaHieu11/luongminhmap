import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Detail.css';

// Auto-detect API URL
const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchLocation();
  }, [id]);

  const fetchLocation = async () => {
    try {
      const response = await axios.get(`${API_URL}/locations/${id}`);
      setLocation(response.data);
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenGoogleMaps = () => {
    if (location?.googleMapsUrl) {
      window.open(location.googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getImageSrc = (imagePath) => {
    if (imagePath && imagePath.startsWith('/images/')) {
      return imagePath;
    }
    return imagePath || location?.fallbackImage || 'https://via.placeholder.com/800x400?text=No+Image';
  };

  const images = location?.images || (location?.image ? [location.image] : []);

  if (loading) {
    return (
      <div className="App">
        <Header />
        <div className="detail-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải thông tin...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="App">
        <Header />
        <div className="detail-error">
          <h2>Không tìm thấy địa điểm</h2>
          <button onClick={() => navigate('/')} className="back-button">
            Quay lại trang chủ
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="detail-container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Quay lại
        </button>

        <div className="detail-content">
          <h1 className="detail-title">{location.name}</h1>
          <p className="detail-address">{location.address}</p>
          <span className="detail-category">{location.category}</span>

          {/* Main Image Gallery */}
          <div className="detail-image-gallery">
            <div className="detail-main-image">
              <img
                src={getImageSrc(images[selectedImageIndex] || location.image)}
                alt={location.name}
                onError={(e) => {
                  e.target.src = location.fallbackImage || 'https://via.placeholder.com/800x400?text=No+Image';
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="detail-thumbnails">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={getImageSrc(img)}
                    alt={`${location.name} - ${index + 1}`}
                    className={selectedImageIndex === index ? 'active' : ''}
                    onClick={() => setSelectedImageIndex(index)}
                    onError={(e) => {
                      e.target.src = location.fallbackImage || 'https://via.placeholder.com/150x100?text=No+Image';
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          {location.description && (
            <div className="detail-section">
              <h2>Giới thiệu</h2>
              <p>{location.description}</p>
            </div>
          )}

          {/* History */}
          {location.history && (
            <div className="detail-section">
              <h2>Lịch sử</h2>
              <p>{location.history}</p>
            </div>
          )}

          {/* Actions */}
          <div className="detail-actions">
            <button onClick={handleOpenGoogleMaps} className="detail-button primary">
              Mở Google Maps
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;

