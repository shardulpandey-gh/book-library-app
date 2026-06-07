import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import * as pdfjsLib from 'pdfjs-dist';
import './BookViewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function BookViewer({ book, onBack }) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdf, setPdf] = useState(null);
  const [currentPageImage, setCurrentPageImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPdf();
  }, [book]);

  const loadPdf = async () => {
    try {
      setIsLoading(true);
      const pdf = await pdfjsLib.getDocument({ data: book.pdfData }).promise;
      setPdf(pdf);
      setTotalPages(pdf.numPages);
      renderPage(1, pdf);
    } catch (err) {
      setError(t('pdfLoadError'));
      console.error('PDF Load Error:', err);
    }
  };

  const renderPage = async (pageNum, pdfDoc = null) => {
    try {
      const pdfToUse = pdfDoc || pdf;
      if (!pdfToUse) return;
      const page = await pdfToUse.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      setCurrentPageImage(canvas.toDataURL());
      setCurrentPage(pageNum);
      setIsLoading(false);
    } catch (err) {
      console.error('Render Error:', err);
      setError(t('renderError'));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      renderPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      renderPage(currentPage - 1);
    }
  };

  const handlePageInput = (e) => {
    const page = parseInt(e.target.value) || 1;
    if (page >= 1 && page <= totalPages) {
      renderPage(page);
    }
  };

  if (error) {
    return (
      <div className="viewer-container">
        <div className="viewer-header">
          <button className="back-btn" onClick={onBack}><FiArrowLeft /> {t('back')}</button>
          <h2>{book.title}</h2>
        </div>
        <div className="error-display">{error}</div>
      </div>
    );
  }

  return (
    <div className="viewer-container">
      <div className="viewer-header">
        <button className="back-btn" onClick={onBack}><FiArrowLeft /> {t('back')}</button>
        <h2>{book.title}</h2>
        <p className="book-meta">by {book.author}</p>
      </div>
      <div className="viewer-content">
        {isLoading && <div className="loading">{t('loading')}</div>}
        {currentPageImage && (
          <div className="pdf-display">
            <img src={currentPageImage} alt={`Page ${currentPage}`} />
          </div>
        )}
      </div>
      <div className="viewer-controls">
        <button className="control-btn" onClick={handlePrevPage} disabled={currentPage === 1} title={t('previousPage')}>
          <FiChevronLeft /> {t('previous')}
        </button>
        <div className="page-info">
          <input type="number" min="1" max={totalPages} value={currentPage} onChange={handlePageInput} className="page-input" />
          <span> / {totalPages}</span>
        </div>
        <button className="control-btn" onClick={handleNextPage} disabled={currentPage === totalPages} title={t('nextPage')}>
          {t('next')} <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default BookViewer;
