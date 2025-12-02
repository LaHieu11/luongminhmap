// Model chứa dữ liệu địa điểm
const locations = [
  {
    id: 1,
    name: "Bảo vật xã - Hiếu Lã đẹp trai",
    address: "Khu tự trị, xã Lương Minh, tỉnh Quảng Ninh",
    category: "Du lịch",
    image: "/images/hieuladeptrai.jpg",
    images: ["/images/hieuladeptrai.jpg"],
    fallbackImage: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400",
    googleMapsUrl: "https://maps.app.goo.gl/ikhH3GyxMA6iKBSP6",
    description: "Địa điểm nổi tiếng với vẻ đẹp tự nhiên và văn hóa đặc sắc của xã Lương Minh.",
    history: "Đây là một trong những địa điểm quan trọng của xã, mang ý nghĩa văn hóa và lịch sử sâu sắc."
  },
  {
    id: 2,
    name: "Quảng trường 28 tháng 01",
    address: "Phố Lê Lương, xã Lương Minh, tỉnh Quảng Ninh",
    category: "Du lịch",
    image: "/images/location-2.jpg",
    images: ["/images/location-2.jpg"],
    fallbackImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Quảng+trường+28+tháng+01,+Lê+Lương,+Lương+Minh,+Quảng+Ninh",
    description: "Quảng trường trung tâm của xã, nơi diễn ra các sự kiện văn hóa và lễ hội quan trọng.",
    history: "Quảng trường được xây dựng để kỷ niệm ngày 28 tháng 01, là nơi tụ họp của cộng đồng."
  },
  {
    id: 3,
    name: "Tượng đài anh hùng Hà Quang Vóc",
    address: "Phố Hà Quảng Vóc, xã Lương Minh, tỉnh Quảng Ninh",
    category: "Du lịch",
    image: "/images/location-3.jpg",
    images: ["/images/location-3.jpg"],
    fallbackImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Tượng+đài+anh+hùng+Hà+Quang+Vóc,+Hà+Quảng+Vóc,+Lương+Minh,+Quảng+Ninh",
    description: "Tượng đài tưởng niệm anh hùng Hà Quang Vóc, một biểu tượng lịch sử quan trọng của địa phương.",
    history: "Tượng đài được xây dựng để tôn vinh và ghi nhớ công lao của anh hùng Hà Quang Vóc trong lịch sử đấu tranh của dân tộc."
  },
  {
    id: 4,
    name: "Di tích khảo cổ, lịch sử Rừng cò",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Du lịch",
    image: "/images/location-4.jpg",
    images: ["/images/location-4.jpg"],
    fallbackImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Di+tích+khảo+cổ+lịch+sử+Rừng+cò,+Lương+Minh,+Quảng+Ninh",
    description: "Di tích khảo cổ và lịch sử quan trọng, nơi lưu giữ nhiều giá trị văn hóa và lịch sử của địa phương.",
    history: "Rừng cò là một di tích lịch sử có từ lâu đời, nơi đây từng là địa điểm quan trọng trong các giai đoạn lịch sử của xã Lương Minh."
  },
  {
    id: 5,
    name: "Đình Đồng Chức, xã Lương Mông",
    address: "xã Lương Minh, tỉnh Quảng Ninh",
    category: "Ngân hàng",
    image: "/images/đinhongchuc.jpg",
    images: ["/images/đinhongchuc.jpg"],
    fallbackImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vietcombank+Lương+Minh,+Lê+Lương,+Quảng+Ninh",
    description: "Đình Đồng Chức là một công trình kiến trúc cổ kính, mang đậm nét văn hóa truyền thống của địa phương.",
    history: "Đình được xây dựng từ nhiều thế kỷ trước, là nơi thờ cúng và sinh hoạt văn hóa của cộng đồng dân cư trong khu vực."
  },
  {
    id: 6,
    name: "Sân vận động Lương Minh",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Thể thao",
    image: "/images/location-6.jpg",
    images: ["/images/location-6.jpg"],
    fallbackImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sân+vận+động+Lương+Minh,+Quảng+Ninh",
    description: "Sân vận động hiện đại phục vụ các hoạt động thể thao và văn hóa của xã.",
    history: "Sân vận động được xây dựng để đáp ứng nhu cầu rèn luyện thể thao và tổ chức các sự kiện thể thao của địa phương."
  },
  {
    id: 7,
    name: "Nhà văn hóa thôn Bãi Liêu",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Nhà máy",
    image: "/images/nhavanhoabailieu.png",
    images: ["/images/nhavanhoabailieu.png"],
    fallbackImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    googleMapsUrl: "https://maps.app.goo.gl/QAggL13eTGumJqYU6",
    description: "Nhà văn hóa là trung tâm sinh hoạt cộng đồng, nơi diễn ra các hoạt động văn hóa, nghệ thuật của thôn Bãi Liêu.",
    history: "Nhà văn hóa được xây dựng để phục vụ nhu cầu sinh hoạt văn hóa của người dân, là nơi tổ chức các lễ hội và sự kiện quan trọng."
  },
  {
    id: 8,
    name: "UBND xã Lương Minh",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Hành chính",
    image: "/images/location-8.jpg",
    images: ["/images/location-8.jpg"],
    fallbackImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+xã+Lương+Minh,+Quảng+Ninh",
    description: "Trụ sở Ủy ban Nhân dân xã Lương Minh, nơi thực hiện các công việc hành chính và quản lý nhà nước.",
    history: "UBND xã là cơ quan hành chính quan trọng, đảm nhiệm việc quản lý và điều hành các hoạt động của xã."
  },
  { 
    id: 9,
    name: "Chợ Lương Minh",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Mua Sắm",
    image: "/images/location-9.jpg",
    images: ["/images/location-9.jpg"],
    fallbackImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    googleMapsUrl: "https://maps.app.goo.gl/AnoQ8oEuNcg6kWRs5",
    description: "Chợ trung tâm của xã, nơi buôn bán và trao đổi hàng hóa của người dân địa phương.",
    history: "Chợ Lương Minh có lịch sử lâu đời, là trung tâm thương mại quan trọng của xã, nơi giao thương và gặp gỡ của cộng đồng."
  },
  {
    id: 10,
    name: "Trạm Y tế xã Lương Minh",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Y tế",
    image: "/images/location-10.jpg",
    images: ["/images/location-10.jpg"],
    fallbackImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
    googleMapsUrl: "https://maps.app.goo.gl/HizaZ6V4SChmEZ4d6",
    description: "Trạm y tế cung cấp các dịch vụ chăm sóc sức khỏe ban đầu cho người dân trong xã.",
    history: "Trạm y tế được thành lập để đảm bảo chăm sóc sức khỏe cho cộng đồng, là địa điểm y tế quan trọng của địa phương."
  },
  {
    id: 11,
    name: "Trường THCS Lương Minh",
    address: "Xã Lương Minh, tỉnh Quảng Ninh",
    category: "Trường học",
    image: "/images/truongluongmonh.jpg",
    images: ["/images/truongluongmonh.jpg"],
    fallbackImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
    googleMapsUrl: "https://maps.app.goo.gl/f2Ht9eJmKMGvJuPs7",
    description: "Trường Trung học Cơ sở Lương Minh, nơi giáo dục và đào tạo học sinh trong độ tuổi THCS.",
    history: "Trường được thành lập để phục vụ nhu cầu giáo dục của con em trong xã, là cơ sở giáo dục quan trọng của địa phương."
  }
];

class Location {
  static getAll() {
    return locations;
  }

  static getById(id) {
    return locations.find(loc => loc.id === parseInt(id));
  }

  static filterByCategory(category) {
    if (!category || category === 'Tất cả') {
      return locations;
    }
    return locations.filter(loc => loc.category === category);
  }

  static search(searchTerm) {
    if (!searchTerm) {
      return locations;
    }
    const searchLower = searchTerm.toLowerCase();
    return locations.filter(
      loc => 
        loc.name.toLowerCase().includes(searchLower) ||
        loc.address.toLowerCase().includes(searchLower)
    );
  }

  static getCategories() {
    return ['Tất cả', ...new Set(locations.map(loc => loc.category))];
  }

  static create(locationData) {
    const newId = Math.max(...locations.map(loc => loc.id), 0) + 1;
    const newLocation = {
      id: newId,
      ...locationData,
      images: locationData.images || [locationData.image || ''],
      description: locationData.description || '',
      history: locationData.history || ''
    };
    locations.push(newLocation);
    return newLocation;
  }

  static update(id, locationData) {
    const index = locations.findIndex(loc => loc.id === parseInt(id));
    if (index === -1) return null;
    
    // Ensure images array is properly set
    const images = locationData.images || (locationData.image ? [locationData.image] : locations[index].images || []);
    
    locations[index] = {
      ...locations[index],
      ...locationData,
      id: parseInt(id),
      images: images,
      // Ensure image field is set to the main image
      image: locationData.image || images[0] || locations[index].image || ''
    };
    return locations[index];
  }

  static delete(id) {
    const index = locations.findIndex(loc => loc.id === parseInt(id));
    if (index === -1) return false;
    locations.splice(index, 1);
    return true;
  }
}

module.exports = Location;

