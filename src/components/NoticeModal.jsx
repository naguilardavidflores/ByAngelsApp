import React, { useState, useEffect } from 'react';

export default function NoticeModal({ visible, onClose, apiUrl }) {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const fetchNotices = async () => {
      setLoading(true);
      try {
        const base = apiUrl || 'http://localhost:5000';
        const res = await fetch(`${base}/api/notice`);
        if (res.ok) {
          const data = await res.json();
          const extractedUrls = [];
          
          if (data && data.length > 0) {
            data.forEach(doc => {
              Object.keys(doc).forEach(key => {
                if (key.startsWith('urlN') && doc[key]) {
                  extractedUrls.push({
                    key,
                    url: doc[key]
                  });
                }
              });
            });

            // Sort by key number: urlN0, urlN1, urlN2...
            extractedUrls.sort((a, b) => {
              const numA = parseInt(a.key.replace('urlN', ''), 10) || 0;
              const numB = parseInt(b.key.replace('urlN', ''), 10) || 0;
              return numA - numB;
            });
          }

          setReels(extractedUrls.map(item => item.url));
        }
      } catch (err) {
        console.warn('Could not load Notice reels, using fallbacks.', err);
        setReels([
          'https://i.pinimg.com/736x/cb/c9/28/cbc928d11c002235c3c04b46c6530669.jpg',
          'https://i.pinimg.com/736x/43/3e/49/433e49be9d2de6b7cbe3bebf78b278ec.jpg',
          'https://i.pinimg.com/736x/cf/e6/78/cfe678d49a37c95e0c52bb744cf2fbdc.jpg'
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [visible, apiUrl]);

  if (!visible) return null;

  return (
    <div className="notice-modal-overlay">
      <div className="notice-modal-container">
        <header className="notice-modal-header">
          <h2>Novedades de la Semana</h2>
          <button className="notice-modal-close" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </header>

        <div className="notice-modal-content">
          {loading ? (
            <div className="notice-loading">
              <div className="welcome-spinner"></div>
              <p>Cargando novedades...</p>
            </div>
          ) : reels.length > 0 ? (
            <div className="notice-reels-slider">
              {reels.map((url, index) => (
                <div key={index} className="notice-reel-slide">
                  <div className="notice-reel-badge">Reel {index + 1}</div>
                  <img src={url} alt={`Noticia Reel ${index + 1}`} className="notice-reel-img" />
                </div>
              ))}
              
              {/* Decorative end card */}
              <div className="notice-reel-slide notice-end-slide">
                <div className="notice-end-content">
                  <h3>¡Eso es todo!</h3>
                  <p>Explora nuestra colección completa y encuentra tu outfit ideal.</p>
                  <button className="notice-end-btn" onClick={onClose}>
                    Explorar Catálogo
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="notice-empty">
              <p>No hay novedades disponibles en este momento.</p>
              <button className="notice-end-btn" onClick={onClose}>
                Explorar Catálogo
              </button>
            </div>
          )}
        </div>
        
        <div className="notice-modal-footer">
          <span className="notice-swipe-hint">Desliza a la derecha para ver más &rarr;</span>
        </div>
      </div>
    </div>
  );
}
