.video-hero {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.video-hero-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.cover-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.video-hero-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-play-button .icon {
  width: 40px;
  height: 40px;
  color: #000;
}

.video-hero-overlay {
  position: absolute;
  z-index: 4;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
  left: 5%;
  bottom: 10%;
  width: 45%;
  text-align: left;
}

.video-hero-overlay.hidden {
  display: none;
}

.video-hero-text,
.video-hero-subtext {
  margin-bottom: 1em;
}

.video-hero-button {
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 1em;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  color: #ffffff;
  background-color: #000000;
}

.rounded-button {
  border-radius: 50px;
}

.video-hero-button:hover {
  background-color: #ffffff;
  color: #000000;
}

/* Mobile specific styles */
@media (max-width: 767px) {
  .video-hero-overlay {
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .video-hero-text {
    font-size: 1.5em;
  }

  .video-hero-subtext {
    font-size: 1em;
  }

  .video-hero-button-container {
    display: flex;
    justify-content: center;
  }

  .mobile-video {
    display: block;
  }

  .video-hero-background:not(.mobile-video) {
    display: none;
  }
}

/* Desktop specific styles */
@media (min-width: 768px) {
  .video-hero-text {
    font-size: 2em;
    font-weight: bold;
  }

  .video-hero-subtext {
    font-size: 1em;
    font-weight: normal;
  }

  .mobile-video {
    display: none;
  }
}