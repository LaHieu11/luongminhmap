import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>Bản đồ Địa điểm Lương Minh</h1>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li><a href="#home">Trang chủ</a></li>
            <li><a href="#locations">Địa điểm</a></li>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#contact">Liên hệ</a></li>
          </ul>
        </nav>
        <div className="header-info">
          <span className="header-date">
            {new Date().toLocaleDateString('vi-VN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

