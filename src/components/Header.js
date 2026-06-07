import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaBook } from 'react-icons/fa';
import './Header.css';

function Header({ onLanguageChange }) {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <FaBook className="logo-icon" />
          <h1>{t('appTitle')}</h1>
        </div>
        <div className="language-switcher">
          <button className="lang-btn en-btn" onClick={() => onLanguageChange('en')}>English</button>
          <button className="lang-btn hi-btn" onClick={() => onLanguageChange('hi')}>हिन्दी</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
