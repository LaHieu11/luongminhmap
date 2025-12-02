import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageManager from '../components/ImageManager';
import './Admin.css';

// Auto-detect API URL
const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

function Admin() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    category: '',
    image: '',
    images: [],
    googleMapsUrl: '',
    description: '',
    history: ''
  });
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    fetchLocations();
  }, [user, isAdmin, navigate]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${API_URL}/locations`);
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (location = null) => {
    if (location) {
      setEditingLocation(location);
      const locationImages = location.images || (location.image ? [location.image] : []);
      // Find the index of the main image in the images array
      let mainIndex = 0;
      if (location.image && locationImages.length > 0) {
        const foundIndex = locationImages.findIndex(img => img === location.image);
        mainIndex = foundIndex >= 0 ? foundIndex : 0;
      }
      setMainImageIndex(mainIndex);
      setFormData({
        name: location.name || '',
        address: location.address || '',
        category: location.category || '',
        image: location.image || '',
        images: locationImages,
        googleMapsUrl: location.googleMapsUrl || '',
        description: location.description || '',
        history: location.history || ''
      });
    } else {
      setEditingLocation(null);
      setMainImageIndex(0);
      setFormData({
        name: '',
        address: '',
        category: '',
        image: '',
        images: [],
        googleMapsUrl: '',
        description: '',
        history: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLocation(null);
  };

  const handleImagesChange = (images) => {
    // Extract URLs from image objects
    const imageUrls = images.map(img => {
      if (typeof img === 'string') return img;
      return img.url || img;
    });
    const mainImage = imageUrls[mainImageIndex] || imageUrls[0] || '';
    
    setFormData({
      ...formData,
      images: imageUrls,
      image: mainImage
    });
  };

  const handleMainImageChange = (index) => {
    setMainImageIndex(index);
    if (formData.images && formData.images.length > index) {
      // Extract URLs from image objects or use strings directly
      const imageUrls = formData.images.map(img => {
        if (typeof img === 'string') return img;
        return img.url || img;
      });
      // Set the selected image as the main image
      const newMainImage = imageUrls[index] || imageUrls[0] || formData.image || '';
      setFormData({
        ...formData,
        image: newMainImage
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check total size of base64 images
    let totalSize = 0;
    const base64Images = formData.images.filter(img => {
      if (typeof img === 'string' && img.startsWith('data:')) {
        // Estimate base64 size (base64 is ~33% larger than original)
        totalSize += (img.length * 3) / 4;
        return true;
      }
      return false;
    });

    // Warn if total size is too large (40MB limit to stay under 50MB server limit)
    const MAX_TOTAL_SIZE = 40 * 1024 * 1024; // 40MB
    if (totalSize > MAX_TOTAL_SIZE) {
      const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
      if (!window.confirm(
        `Cảnh báo: Tổng kích thước ảnh là ${totalSizeMB}MB, vượt quá giới hạn khuyến nghị (40MB). ` +
        `Việc lưu có thể thất bại hoặc mất nhiều thời gian. Bạn có muốn tiếp tục?`
      )) {
        return;
      }
    }

    try {
      // Convert images array to URLs (handle both string and object formats)
      const imageUrls = formData.images.map(img => {
        if (typeof img === 'string') return img;
        return img.url || img;
      });
      
      // Ensure mainImage is set correctly from mainImageIndex
      // Priority: mainImageIndex -> first image -> existing image field
      let mainImage = '';
      if (imageUrls.length > 0) {
        if (mainImageIndex >= 0 && mainImageIndex < imageUrls.length) {
          mainImage = imageUrls[mainImageIndex];
        } else {
          mainImage = imageUrls[0];
        }
      }
      // Fallback to existing image if no images array
      if (!mainImage) {
        mainImage = formData.image || '';
      }

      const submitData = {
        ...formData,
        images: imageUrls,
        image: mainImage  // Always set the main image explicitly
      };

      if (editingLocation) {
        await axios.put(`${API_URL}/locations/${editingLocation.id}`, submitData);
      } else {
        await axios.post(`${API_URL}/locations`, submitData);
      }

      handleCloseModal();
      fetchLocations();
    } catch (error) {
      console.error('Error saving location:', error);
      if (error.response?.status === 413) {
        alert(
          'Lỗi: Dữ liệu quá lớn để lưu. ' +
          'Vui lòng giảm số lượng ảnh hoặc sử dụng ảnh có kích thước nhỏ hơn (tối đa 2MB mỗi ảnh).'
        );
      } else {
        alert('Có lỗi xảy ra khi lưu địa điểm: ' + (error.response?.data?.error?.message || error.message));
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa địa điểm này?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/locations/${id}`);
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('Có lỗi xảy ra khi xóa địa điểm');
    }
  };

  if (loading) {
    return (
      <div className="App">
        <Header />
        <div className="admin-loading">Đang tải...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="admin-container">
        <div className="admin-header">
          <h1>Quản lý địa điểm</h1>
          <div className="admin-actions">
            <button onClick={() => handleOpenModal()} className="btn-primary">
              + Thêm địa điểm mới
            </button>
            <button onClick={() => navigate('/')} className="btn-secondary">
              Về trang chủ
            </button>
            <button onClick={logout} className="btn-secondary">
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên địa điểm</th>
                <th>Địa chỉ</th>
                <th>Danh mục</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id}>
                  <td>{location.id}</td>
                  <td>{location.name}</td>
                  <td>{location.address}</td>
                  <td>{location.category}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleOpenModal(location)}
                        className="btn-edit"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(location.id)}
                        className="btn-delete"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => navigate(`/location/${location.id}`)}
                        className="btn-view"
                      >
                        Xem
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingLocation ? 'Sửa địa điểm' : 'Thêm địa điểm mới'}</h2>
                <button className="modal-close" onClick={handleCloseModal}>×</button>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Tên địa điểm *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Danh mục *</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Địa chỉ *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Quản lý ảnh</label>
                  <ImageManager
                    images={formData.images}
                    onChange={handleImagesChange}
                    mainImageIndex={mainImageIndex}
                    onMainImageChange={handleMainImageChange}
                  />
                  <small className="form-hint">
                    Kéo thả ảnh vào vùng trên, chọn file từ máy, hoặc thêm URL. Ảnh đầu tiên sẽ là ảnh chính.
                  </small>
                </div>

                <div className="form-group">
                  <label>Google Maps URL</label>
                  <input
                    type="url"
                    value={formData.googleMapsUrl}
                    onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Lịch sử</label>
                  <textarea
                    value={formData.history}
                    onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={handleCloseModal} className="btn-secondary">
                    Hủy
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingLocation ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Admin;

