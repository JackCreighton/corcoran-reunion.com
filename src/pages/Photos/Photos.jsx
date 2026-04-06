import { useState } from 'react';
import { X } from 'lucide-react';
import photosData from '../../../legacy_site/photos.json';
import './Photos.css';

const Photos = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Parse the paths to be absolute from public folder, e.g. "photos/file.jpg" -> "/photos/file.jpg"
  const formattedPhotos = photosData.map(path => path.startsWith('/') ? path : `/${path}`);

  return (
    <div className="photos-page animate-fade-in">
      <div className="container">
        
        <div className="gallery-header">
          <h2 className="gallery-title">Reunion 2023 <span>Klamath Falls, OR</span></h2>
        </div>

        <div className="gallery-grid">
          {formattedPhotos.map((photoStr, idx) => (
            <div 
              key={idx} 
              className="gallery-item"
              onClick={() => setSelectedPhoto(photoStr)}
            >
              <img src={photoStr} alt={`Reunion moment ${idx}`} className="gallery-img" />
              <div className="gallery-overlay">
                <p className="overlay-text">Click to Expand</p>
                <div className="overlay-subtext">View more</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Rendering */}
      {selectedPhoto && (
        <div className="lightbox" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
            <X size={40} />
          </button>
          {/* Stop propagation so clicking the image doesnt close the lightbox */}
          <img 
            src={selectedPhoto} 
            alt="Expanded view" 
            className="lightbox-img" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default Photos;
