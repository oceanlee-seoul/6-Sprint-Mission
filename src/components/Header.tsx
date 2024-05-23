import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoOnly from '../assets/logo_only.svg';
import logoText from '../assets/logo_text.svg';
import Button from './Button.jsx';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo-wrapper">
          <img src={logoOnly} className="logo--mark" alt="판다마켓 로고" />
          <img
            src={logoText}
            className="logo--text"
            alt="판다마켓 로고 텍스트"
          />
        </Link>
        <div className="header__gnb-wrapper">
          <NavLink to="/board">자유게시판</NavLink>
          <NavLink to="/items">중고마켓</NavLink>
        </div>
        <div className="header__btn-wrapper">
          <Button>로그인</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
