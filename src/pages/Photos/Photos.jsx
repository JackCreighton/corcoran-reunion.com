import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import photosData from '../../../legacy_site/photos.json';
import './Photos.css';

const Photos = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Parse the paths to be absolute from public folder, e.g. "photos/file.jpg" -> "/photos/file.jpg"
  const formattedPhotos = photosData.map(path => path.startsWith('/') ? path : `/${path}`);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : formattedPhotos.length - 1));
  }, [formattedPhotos.length]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev < formattedPhotos.length - 1 ? prev + 1 : 0));
  }, [formattedPhotos.length]);

  const handleClose = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext, handleClose]);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  const currentPhoto = selectedIndex !== null ? formattedPhotos[selectedIndex] : null;

  return (
    <div className="photos-page animate-fade-in">
      <div className="container">
        
        <div className="gallery-header">
          <h2 className="gallery-title">Reunion 2023 <span>Klamath Falls, OR</span></h2>
          <p className="gallery-subtitle">Memories from our gathering in Klamath Falls • Tap any photo to expand</p>
        </div>

        <div className="gallery-grid">
          {formattedPhotos.map((photoStr, idx) => (
            <div 
              key={idx} 
              className="gallery-item"
              onClick={() => setSelectedIndex(idx)}
            >
              <img src={photoStr} alt={`Reunion moment ${idx + 1}`} className="gallery-img" loading="lazy" />
              <div className="gallery-overlay">
                <p className="overlay-text">Click to Expand</p>
                <div className="overlay-subtext">View photo</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Rendering */}
      {selectedIndex !== null && (
        <div 
          className="lightbox" 
          onClick={handleClose} 
          role="dialog" 
          aria-modal="true" 
          aria-label="Expanded Photo View"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Photo Counter */}
          <div className="lightbox-counter">
            {selectedIndex + 1} / {formattedPhotos.length}
          </div>

          {/* Close button */}
          <button className="lightbox-close" onClick={handleClose} aria-label="Close Photo View">
            <X size={26} />
          </button>

          {/* Left Click Zone & Arrow */}
          <div 
            className="lightbox-nav-zone lightbox-nav-left" 
            onClick={handlePrev} 
            role="button" 
            aria-label="Previous photo"
          >
            <button className="lightbox-nav-btn" aria-label="Previous photo" onClick={handlePrev}>
              <ChevronLeft size={32} />
            </button>
          </div>

          {/* Expanded Image */}
          <div className="lightbox-img-container" onClick={(e) => e.stopPropagation()}>
            <img 
              src={currentPhoto} 
              alt={`Expanded view ${selectedIndex + 1}`} 
              className="lightbox-img" 
            />
          </div>

          {/* Right Click Zone & Arrow */}
          <div 
            className="lightbox-nav-zone lightbox-nav-right" 
            onClick={handleNext} 
            role="button" 
            aria-label="Next photo"
          >
            <button className="lightbox-nav-btn" aria-label="Next photo" onClick={handleNext}>
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
