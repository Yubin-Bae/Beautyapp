import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false); 
  const [activeMenu, setActiveMenu] = useState('');

  const isHome = location.pathname === '/';

  // 네비게이션 바 토글 함수
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // 경로 변경될 때마다 활성화된 메뉴를 업데이트
  useEffect(() => {
    const currentPath = location.pathname;
    setActiveMenu(currentPath); // 현재 경로를 activeMenu 상태로 설정
  }, [location]);

  return (
    <header id="header" className={isHome ? 'header-home' : 'header-top'}>
      <div className="container">
        <h1><Link to="/">Beauty Planet</Link></h1>
        <h2>
          Personalized beauty with <span className="highlight"><strong>Virtual Makeup</strong></span> and <span className="highlight"><strong>Personal Color</strong></span>
        </h2>

        <div className="mobile-nav-toggle" onClick={toggleNav}>
          ☰ 
        </div>

        <nav id="navbar" className={`navbar ${isNavOpen ? 'navbar-mobile' : ''}`}>
          <ul>
            <li className={activeMenu === '/' ? 'active' : ''}>
              <Link className="nav-link" to="/" onClick={() => setIsNavOpen(false)}>Home</Link>
            </li>
            <li className={activeMenu === '/about' ? 'active' : ''}>
              <Link className="nav-link" to="/about" onClick={() => setIsNavOpen(false)}>About</Link>
            </li>
            <li className={activeMenu === '/personal' ? 'active' : ''}>
              <Link className="nav-link" to="/personal" onClick={() => setIsNavOpen(false)}>Personal Color</Link>
            </li>
            <li className={activeMenu === '/makeup' ? 'active' : ''}>
              <Link className="nav-link" to="/makeup" onClick={() => setIsNavOpen(false)}>Virtual Makeup</Link>
            </li>
            <li className={activeMenu === '/lips' ? 'active' : ''}>
              <Link className="nav-link" to="/lips" onClick={() => setIsNavOpen(false)}>Lips</Link>
            </li>
            <li className={activeMenu === '/contact' ? 'active' : ''}>
              <Link className="nav-link" to="/contact" onClick={() => setIsNavOpen(false)}>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
