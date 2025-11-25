import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Liên kết nhanh</h3>
            <ul className="footer-links">
              <li>
                <a 
                  href="https://web.facebook.com/thanh.nien.luong.minh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Thông tin Đoàn thanh niên
                </a>
              </li>
              <li>
                <a 
                  href="https://quangninh.gov.vn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Trang thông tin điện tử
                </a>
              </li>
              <li>
                <a 
                  href="https://dichvucong.quangninh.gov.vn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Cổng thông tin điện tử
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Liên hệ</h3>
            <div className="footer-contact">
              <p className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="/">
                  lahieutx@gmail.com
                </a>
              </p>
              <p className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="/">
                  Zalo: 0966768150
                </a>
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Thông tin</h3>
            <div className="footer-info">
              <p>Xã Lương Minh, tỉnh Quảng Ninh</p>
              <p>Hệ thống bản đồ địa điểm trực tuyến</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Bản đồ Địa điểm Lương Minh. Tất cả quyền được bảo lưu.</p>
            <p className="footer-author">
              Người thực hiện: <strong>Đội ngũ phát triển xã Lương Minh</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

