import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function WelcomeScreen({ onEnter, apiUrl }) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchWelcomeImage = async () => {
      try {
        const base = apiUrl || 'http://localhost:5000';
        const res = await fetch(`${base}/api/inicio`);
        if (res.ok) {
          const data = await res.json();
          // Extract Pinterest url from the collection documents
          if (data && data.length > 0) {
            const doc = data[0];
            const url = doc.UrlInicio || doc.url || doc.imagen || doc.imageUrl || doc.img || doc.urlN0;
            if (url) {
              setImageUrl(url);
              return;
            }
          }
        }
      } catch (err) {
        console.warn('Could not load Welcome image from backend, using fallback.', err);
      }
      // Fallback Pinterest URL
      setImageUrl('https://i.pinimg.com/736x/89/3e/a5/893ea5e4b77f98d75225c5d012431718.jpg');
    };

    fetchWelcomeImage();
  }, [apiUrl]);

  useEffect(() => {
    if (!imageUrl || !videoRef.current) return;
    const video = videoRef.current;
    
    // Check if the URL is an HLS stream (.m3u8)
    const isHls = imageUrl.includes('.m3u8');
    
    video.muted = true; // Video background is completely silent now
    
    if (isHls) {
      const base = apiUrl || 'http://localhost:5000';
      // Strip v1.pinimg.com domain if present to construct path-based proxy URL
      const cleanPath = imageUrl.replace('https://v1.pinimg.com/videos/', '');
      const proxiedUrl = `${base}/api/proxy-video/${cleanPath}`;
      
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(proxiedUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(e => console.log("Play failed:", e));
          setLoading(false);
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error("HLS fatal error:", data);
            setLoading(false);
          }
        });
        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari / iOS)
        video.src = proxiedUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(e => console.log("Play failed:", e));
          setLoading(false);
        });
        video.addEventListener('error', () => {
          setLoading(false);
        });
      } else {
        console.error("HLS is not supported in this browser");
        setLoading(false);
      }
    } else if (isVideoUrl(imageUrl)) {
      // Normal video URL
      video.src = imageUrl;
      video.load();
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log("Play failed:", e));
        setLoading(false);
      });
      video.addEventListener('error', () => {
        setLoading(false);
      });
    }
  }, [imageUrl]);

  const handleEnterClick = (e) => {
    setFadeOut(true);
    // Let the animation finish before calling onEnter
    setTimeout(() => {
      onEnter();
    }, 600); // match CSS transition duration
  };

  const isVideoUrl = (url) => {
    if (!url) return false;
    return (
      /\.(mp4|webm|ogg|mov|m4v|m3u8)($|\?)/i.test(url) ||
      url.includes('/video/') ||
      url.includes('v.pinimg.com') ||
      url.includes('v/video')
    );
  };

  return (
    <div className={`welcome-screen ${fadeOut ? 'fade-out' : ''}`}>
      {/* Background Media (Image or Video) */}
      {imageUrl && (
        isVideoUrl(imageUrl) ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="welcome-bg-image"
            onLoadedData={() => {
              if (!imageUrl.includes('.m3u8')) {
                setLoading(false);
              }
            }}
            onError={() => setLoading(false)}
          />
        ) : (
          <img
            src={imageUrl}
            alt="Boutique Welcome"
            className="welcome-bg-image"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        )
      )}
      
      {/* Dark tint overlay */}
      <div className="welcome-overlay"></div>

      {/* Content card */}
      <div className="welcome-content">
        <p className="welcome-subtitle">Boutique & Trends</p>
        
        {loading ? (
          <div className="welcome-spinner"></div>
        ) : (
          <button className="welcome-btn" onClick={handleEnterClick}>
            Entrar
          </button>
        )}
      </div>
    </div>
  );
}
