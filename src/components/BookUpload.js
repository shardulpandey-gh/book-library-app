import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';
import './BookUpload.css';

function BookUpload({ onUpload, onCancel }) {
  const { t } = useTranslation();
  const [bookData, setBookData] = useState({ title: '', author: '', description: '', language: 'en' });
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setError('');
      } else {
        setError(t('pdfOnly'));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookData.title || !bookData.author || !pdfFile) {
      setError(t('fillAllFields'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newBook = {
        id: Date.now(),
        ...bookData,
        pdfData: event.target.result,
        uploadDate: new Date().toLocaleDateString()
      };
      onUpload(newBook);
      setBookData({ title: '', author: '', description: '', language: 'en' });
      setPdfFile(null);
    };
    reader.readAsArrayBuffer(pdfFile);
  };

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <div className="upload-header">
          <h2>{t('uploadBook')}</h2>
          <button className="close-btn" onClick={onCancel}><FiX /></button>
        </div>
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">{t('bookTitle')} *</label>
            <input id="title" type="text" name="title" value={bookData.title} onChange={handleInputChange} placeholder={t('enterTitle')} />
          </div>
          <div className="form-group">
            <label htmlFor="author">{t('author')} *</label>
            <input id="author" type="text" name="author" value={bookData.author} onChange={handleInputChange} placeholder={t('enterAuthor')} />
          </div>
          <div className="form-group">
            <label htmlFor="description">{t('description')}</label>
            <textarea id="description" name="description" value={bookData.description} onChange={handleInputChange} placeholder={t('enterDescription')} rows="4" />
          </div>
          <div className="form-group">
            <label htmlFor="language">{t('language')}</label>
            <select name="language" value={bookData.language} onChange={handleInputChange}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pdf">{t('uploadPDF')} *</label>
            <input id="pdf" type="file" accept=".pdf" onChange={handleFileChange} className="file-input" />
            {pdfFile && <p className="file-name">✓ {pdfFile.name}</p>}
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>{t('cancel')}</button>
            <button type="submit" className="submit-btn">{t('upload')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookUpload;
