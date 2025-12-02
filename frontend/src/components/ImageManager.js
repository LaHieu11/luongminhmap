import React, { useState, useRef, useCallback } from 'react';
import './ImageManager.css';

// Maximum file size: 2MB per image
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const MAX_FILE_SIZE_MB = 2; // For display

// Format file size for display
const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const ImageManager = ({ images = [], onChange, mainImageIndex = 0, onMainImageChange }) => {
  const [imageList, setImageList] = useState(images || []);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Convert file to base64 data URL
  const fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle file selection
  const handleFileSelect = useCallback(async (files) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      setError('Vui lòng chọn file ảnh');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validate file sizes
    const oversizedFiles = imageFiles.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      const fileNames = oversizedFiles.map(f => `${f.name} (${formatFileSize(f.size)})`).join(', ');
      setError(
        `Các file sau vượt quá kích thước cho phép (${MAX_FILE_SIZE_MB}MB): ${fileNames}. ` +
        `Vui lòng chọn ảnh nhỏ hơn ${MAX_FILE_SIZE_MB}MB.`
      );
      setTimeout(() => setError(''), 5000);
      return;
    }

    // Clear previous errors
    setError('');

    try {
      const newImages = await Promise.all(
        imageFiles.map(async (file) => {
          const dataURL = await fileToDataURL(file);
          return {
            url: dataURL,
            name: file.name,
            size: file.size,
            type: 'file' // Mark as uploaded file
          };
        })
      );

      const updatedImages = [...imageList, ...newImages];
      setImageList(updatedImages);
      onChange(updatedImages);
    } catch (error) {
      console.error('Error processing images:', error);
      setError('Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại.');
      setTimeout(() => setError(''), 5000);
    }
  }, [imageList, onChange]);

  // Handle drag and drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  }, [handleFileSelect]);

  // Handle file input change
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
    // Reset input
    e.target.value = '';
  };

  // Remove image
  const handleRemoveImage = (index) => {
    const updatedImages = imageList.filter((_, i) => i !== index);
    setImageList(updatedImages);
    onChange(updatedImages);
    
    // Adjust main image index if needed
    if (onMainImageChange) {
      if (index === mainImageIndex && updatedImages.length > 0) {
        onMainImageChange(0);
      } else if (index < mainImageIndex) {
        onMainImageChange(mainImageIndex - 1);
      }
    }
  };

  // Set as main image
  const handleSetMainImage = (index) => {
    if (onMainImageChange) {
      onMainImageChange(index);
    }
  };

  // Move image up/down
  const handleMoveImage = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= imageList.length) return;

    const updatedImages = [...imageList];
    [updatedImages[index], updatedImages[newIndex]] = [updatedImages[newIndex], updatedImages[index]];
    setImageList(updatedImages);
    onChange(updatedImages);

    // Update main image index if needed
    if (onMainImageChange) {
      if (index === mainImageIndex) {
        onMainImageChange(newIndex);
      } else if (newIndex === mainImageIndex) {
        onMainImageChange(index);
      }
    }
  };

  // Add URL manually
  const handleAddUrl = () => {
    const url = prompt('Nhập URL hoặc đường dẫn ảnh:');
    if (url && url.trim()) {
      const updatedImages = [...imageList, {
        url: url.trim(),
        name: 'URL Image',
        type: 'url'
      }];
      setImageList(updatedImages);
      onChange(updatedImages);
    }
  };

  // Update when images prop changes
  React.useEffect(() => {
    if (images !== undefined) {
      // Convert string array to object array if needed
      const formattedImages = Array.isArray(images) ? images.map((img, index) => {
        if (typeof img === 'string') {
          return {
            url: img,
            name: `Image ${index + 1}`,
            type: img.startsWith('data:') ? 'file' : 'url'
          };
        }
        // If already an object, ensure it has required fields
        return {
          url: img.url || img,
          name: img.name || `Image ${index + 1}`,
          type: img.type || 'url'
        };
      }) : [];
      setImageList(formattedImages);
    }
  }, [images]);

  return (
    <div className="image-manager">
      {/* Size limit info */}
      <div className="image-size-info">
        <strong>Kích thước tối đa:</strong> {MAX_FILE_SIZE_MB}MB mỗi ảnh
      </div>

      {/* Error message */}
      {error && (
        <div className="image-error-message">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Drop zone */}
      <div
        className={`image-drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="drop-zone-content">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="drop-zone-text">
            {isDragging ? 'Thả ảnh vào đây' : 'Kéo thả ảnh vào đây hoặc click để chọn'}
          </p>
          <p className="drop-zone-hint">Hỗ trợ: JPG, PNG, GIF, WEBP (Tối đa {MAX_FILE_SIZE_MB}MB mỗi ảnh)</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Add URL button */}
      <button type="button" onClick={handleAddUrl} className="add-url-button">
        + Thêm URL/Đường dẫn ảnh
      </button>

      {/* Image preview grid */}
      {imageList.length > 0 && (
        <div className="image-preview-grid">
          {imageList.map((image, index) => (
            <div
              key={index}
              className={`image-preview-item ${index === mainImageIndex ? 'main-image' : ''}`}
            >
              <div className="image-preview-wrapper">
                <img
                  src={image.url}
                  alt={image.name || `Image ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x150?text=Error';
                  }}
                />
                {index === mainImageIndex && (
                  <div className="main-image-badge">Ảnh chính</div>
                )}
                <div className="image-actions">
                  <button
                    type="button"
                    onClick={() => handleSetMainImage(index)}
                    className="action-btn set-main-btn"
                    title="Đặt làm ảnh chính"
                  >
                    ⭐
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, 'up')}
                    className="action-btn move-btn"
                    disabled={index === 0}
                    title="Di chuyển lên"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, 'down')}
                    className="action-btn move-btn"
                    disabled={index === imageList.length - 1}
                    title="Di chuyển xuống"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="action-btn remove-btn"
                    title="Xóa ảnh"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="image-info">
                <span className="image-index">#{index + 1}</span>
                <div className="image-name-wrapper">
                  <span className="image-name" title={image.name}>
                    {image.name || `Ảnh ${index + 1}`}
                  </span>
                  {image.size && (
                    <span className="image-size">{formatFileSize(image.size)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      {imageList.length === 0 && (
        <div className="image-manager-info">
          <p>Chưa có ảnh nào. Hãy thêm ảnh bằng cách kéo thả hoặc chọn file.</p>
        </div>
      )}
    </div>
  );
};

export default ImageManager;

