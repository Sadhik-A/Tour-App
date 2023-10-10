import React, { useState } from "react";
import "./ImageViewer.css"; 

function ImageViewer({ imageUrl, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="image-viewer-overlay">
      <div className="image-viewer">
        <div className="viewer-header">
          <button className="close-button" onClick={onClose}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <img
          src={imageUrl}
          alt="tour"
          style={{
            transform: `scale(${zoomLevel})`,
            margin: "20px", 
            padding: "10px", 
          }}
        />
        <div className="zoom-controls">
          <button
            className="zoom-button"
            onClick={() => setZoomLevel(zoomLevel * 1.2)}
          >
            <i className="fa fa-plus"></i> 
          </button>
          <button
            className="zoom-button"
            onClick={() => setZoomLevel(zoomLevel / 1.2)}
          >
            <i className="fa fa-minus"></i> 
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageViewer;
