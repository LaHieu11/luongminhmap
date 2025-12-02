import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>Bản đồ Địa điểm Lương Minh</h1>
          </Link>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li><Link to="/">Trang chủ</Link></li>
            <li><a href="#locations">Địa điểm</a></li>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#contact">Liên hệ</a></li>
          </ul>
        </nav>
        <div className="header-info">
          {user ? (
            <div className="header-user">
              {isAdmin() && (
                <Link to="/admin" className="header-link">
                  Quản trị
                </Link>
              )}
              <span className="header-username">{user.username}</span>
              <button onClick={handleLogout} className="header-logout">
                Đăng xuất
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="header-link">
                Đăng nhập
              </Link>
              <span className="header-date">
                {new Date().toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

