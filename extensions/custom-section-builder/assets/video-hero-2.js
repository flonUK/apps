document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-hero-background');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const progressBar = document.querySelector('.progress-bar');
    const progressFilled = document.querySelector('.progress-filled');
    const playPauseBtn = document.querySelector('.play-pause');
    const playPauseText = document.querySelector('.play-pause-text');
    const muteToggle = document.querySelector('.mute-toggle');
    const muteUnmuteText = document.querySelector('.mute-unmute-text');
    const fullscreenToggle = document.querySelector('.fullscreen-toggle');
    const fullscreenText = document.querySelector('.fullscreen-text');
    const videoControls = document.querySelector('.video-controls');
    const playPauseOverlay = document.querySelector('.play-pause-overlay');
    const playPauseOverlayText = playPauseOverlay.querySelector('.play-pause-text');

    function updateProgress() {
        const progressPercentage = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = `${progressPercentage}%`;
        updateTime();
    }

    function updateTime() {
        const currentMinutes = Math.floor(video.currentTime / 60);
        const currentSeconds = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        if (!isNaN(video.duration)) {
            const durationMinutes = Math.floor(video.duration / 60);
            const durationSeconds = Math.floor(video.duration % 60).toString().padStart(2, '0');
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    }

    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playPauseBtn.classList.remove('playing');
            playPauseText.textContent = 'PAUSE';
            playPauseOverlayText.textContent = 'PAUSE';
        } else {
            video.pause();
            playPauseBtn.classList.add('playing');
            playPauseText.textContent = 'PLAY';
            playPauseOverlayText.textContent = 'PLAY';
        }
    }

    function toggleMute() {
        video.muted = !video.muted;
        muteToggle.classList.toggle('muted', !video.muted);
        muteUnmuteText.textContent = video.muted ? 'UNMUTE' : 'MUTE';
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
            fullscreenText.textContent = 'FULLSCREEN';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            fullscreenText.textContent = 'FULLSCREEN';
        }
    }

    function updatePlayPausePosition(e) {
        const rect = video.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        playPauseOverlayText.style.left = `${x}px`;
        playPauseOverlayText.style.top = `${y}px`;
    }

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateTime);
    
    playPauseBtn.addEventListener('click', togglePlayPause);
    muteToggle.addEventListener('click', toggleMute);
    fullscreenToggle.addEventListener('click', toggleFullscreen);
    
    progressBar.addEventListener('click', (e) => {
        const clickPosition = (e.pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
        video.currentTime = clickPosition * video.duration;
    });

    video.addEventListener('click', togglePlayPause);
    playPauseOverlay.addEventListener('click', togglePlayPause);
    video.addEventListener('mousemove', updatePlayPausePosition);

    // Show/hide controls
    video.addEventListener('mouseenter', () => {
        videoControls.classList.add('show-controls');
        playPauseOverlay.classList.add('show-overlay');
    });
    video.addEventListener('mouseleave', () => {
        if (video.paused || video.ended) {
            videoControls.classList.remove('show-controls');
            playPauseOverlay.classList.remove('show-overlay');
        }
    });

    // Initialize muted state
    video.muted = true;
    muteToggle.classList.add('muted');
    muteUnmuteText.textContent = 'UNMUTE';
});