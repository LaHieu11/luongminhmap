const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data for locations
// Lưu ý: Để sử dụng ảnh local, đặt ảnh vào thư mục frontend/public/images/
// và đặt tên file theo format: location-[id].jpg (ví dụ: location-1.jpg)
// Nếu không có ảnh local, sẽ sử dụng ảnh mặc định từ URL
const locations = [
  {
    id: 1,
    name: "Bảo vật xã - Hiếu Lã đẹp trai",
    address: "Khu tự trị, xã Lương Minh, tỉnh Quảng Ninh",
    category: "Du lịch",
    image: "/images/hieuladeptrai.jpg", // Thay bằng ảnh local nếu có
    fallbackImage: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400",
    googleMapsUrl: "https://maps.app.goo.gl/ikhH3GyxMA6iKBSP6"
  },
  {
    id: 2,
    name: "Quảng trường 28 tháng 01",
    address: "Phố Lê Lương, xã Lương Minh, tỉnh Quảng Ninh",
    category: "Du lịch",
    image: "/images/location-2.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Quảng+trường+28+tháng+01,+Lê+Lương,+Lương+Minh,+Quảng+Ninh"
  },
  {
    id: 3,
    name: "Tượng đài anh hùng Hà Quang Vóc",
    address: "Phố Hà Quảng Vóc, xã Lương Minh, tỉnh Quảng Ninh",
    category: "Du lịch",
    image: "/images/location-3.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Tượng+đài+anh+hùng+Hà+Quang+Vóc,+Hà+Quảng+Vóc,+Lương+Minh,+Quảng+Ninh"
  },
  {
    id: 4,
    name: "Di tích khảo cổ, lịch sử Rừng cò",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Du lịch",
    image: "/images/location-4.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Di+tích+khảo+cổ+lịch+sử+Rừng+cò,+Lương+Minh,+Quảng+Ninh"
  },
  {
    id: 5,
    name: "Đình Đồng Chức, xã Lương Mông",
    address: "xã Lương Minh, tỉnh Quảng Ninh",
    category: "Ngân hàng",
    image: "/images/đinhongchuc.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vietcombank+Lương+Minh,+Lê+Lương,+Quảng+Ninh"
  },
  {
    id: 6,
    name: "Sân vận động Lương Minh",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Thể thao",
    image: "/images/location-6.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sân+vận+động+Lương+Minh,+Quảng+Ninh"
  },
  {
    id: 7,
    name: "Nhà văn hóa thôn Bãi Liêu",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Nhà máy",
    image: "/images/nhavanhoabailieu.png",
    fallbackImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    googleMapsUrl: "https://maps.app.goo.gl/QAggL13eTGumJqYU6"
  },
  {
    id: 8,
    name: "UBND xã Lương Minh",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Hành chính",
    image: "/images/location-8.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+xã+Lương+Minh,+Quảng+Ninh"
  },
  { 
    id: 9,
    name: "Chợ Lương Minh",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Mua Sắm",
    image: "/images/location-9.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    googleMapsUrl: "https://maps.app.goo.gl/AnoQ8oEuNcg6kWRs5"
  },
  {
    id: 10,
    name: "Trạm Y tế xã Lương Minh",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Y tế",
    image: "/images/location-10.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
    googleMapsUrl: "https://maps.app.goo.gl/HizaZ6V4SChmEZ4d6"
  },
  {
    id: 11,
    name: "Trường THCS Lương Minh",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Trường học",
    image: "/images/truongluongmonh.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
    googleMapsUrl: "https://maps.app.goo.gl/f2Ht9eJmKMGvJuPs7"
  }
];

// Get all locations
app.get('/api/locations', (req, res) => {
  const { category, search } = req.query;
  
  let filteredLocations = [...locations];
  
  // Filter by category
  if (category && category !== 'Tất cả') {
    filteredLocations = filteredLocations.filter(
      loc => loc.category === category
    );
  }
  
  // Filter by search term
  if (search) {
    const searchLower = search.toLowerCase();
    filteredLocations = filteredLocations.filter(
      loc => 
        loc.name.toLowerCase().includes(searchLower) ||
        loc.address.toLowerCase().includes(searchLower)
    );
  }
  
  res.json(filteredLocations);
});

// Get all categories
app.get('/api/categories', (req, res) => {
  const categories = ['Tất cả', ...new Set(locations.map(loc => loc.category))];
  res.json(categories);
});

// Get location by ID
app.get('/api/locations/:id', (req, res) => {
  const location = locations.find(loc => loc.id === parseInt(req.params.id));
  if (!location) {
    return res.status(404).json({ message: 'Location not found' });
  }
  res.json(location);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

