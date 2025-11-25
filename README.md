# Bản đồ Địa điểm Lương Minh

Ứng dụng web hiển thị các địa điểm tại xã Lương Minh, tỉnh Quảng Ninh với khả năng tìm kiếm, lọc theo danh mục và mở trực tiếp trên Google Maps.

## Công nghệ sử dụng

- **Frontend**: React JS
- **Backend**: ExpressJS
- **API**: RESTful API

## Cài đặt và chạy dự án

### Backend

1. Di chuyển vào thư mục backend:
```bash
cd backend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy server:

**Chế độ Production (không tự động reload):**
```bash
npm start
```

**Chế độ Development (tự động reload khi có thay đổi - KHUYẾN NGHỊ):**
```bash
npm run dev
```

> 💡 **Lưu ý**: Sử dụng `npm run dev` để server tự động restart khi bạn thay đổi code. Không cần phải dừng và chạy lại server mỗi lần chỉnh sửa!

Server sẽ chạy tại `http://localhost:5000`

### Frontend

1. Di chuyển vào thư mục frontend:
```bash
cd frontend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng:
```bash
npm start
```

Ứng dụng sẽ mở tại `http://localhost:3000`

## Tính năng

- ✅ Banner giới thiệu với hình ảnh nền
- ✅ Tìm kiếm địa điểm theo tên hoặc địa chỉ
- ✅ Lọc địa điểm theo danh mục (Du lịch, Ngân hàng, Thể thao, Nhà máy, Hành chính, Mua Sắm, Cảng Biển, Y tế, Trường học)
- ✅ Hiển thị danh sách địa điểm dạng card
- ✅ Scroll ngang để xem thêm địa điểm
- ✅ Nút "Mở Google Maps" để mở địa điểm trên Google Maps
- ✅ Responsive design cho mobile và desktop

## Cấu trúc dự án

```
luongminhmap/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json
│   └── .env              # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Banner.js
│   │   │   ├── SearchBar.js
│   │   │   ├── LocationCards.js
│   │   │   └── LocationCard.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### GET /api/locations
Lấy danh sách địa điểm

**Query Parameters:**
- `category` (optional): Lọc theo danh mục
- `search` (optional): Tìm kiếm theo tên hoặc địa chỉ

**Example:**
```
GET /api/locations?category=Du lịch&search=Đồn
```

### GET /api/categories
Lấy danh sách tất cả các danh mục

### GET /api/locations/:id
Lấy thông tin chi tiết một địa điểm

## Tùy chỉnh

### Thay đổi URL API

Trong file `frontend/src/App.js`, bạn có thể thay đổi biến `API_URL` hoặc tạo file `.env` trong thư mục frontend:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Thêm địa điểm mới

Chỉnh sửa mảng `locations` trong file `backend/server.js` để thêm địa điểm mới.

