/**
 * Video Hover Preview System
 * A reusable, framework-free solution for hover-to-preview video interactions
 * Similar to Twitter/X's "DM Resharing" hover preview
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        animationDuration: 200
    };

    // State
    let previewContainer = null;
    let previewVideo = null;
    let currentTarget = null;
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    /**
     * Initialize the video preview system
     */
    function init() {
        // Get or create preview container
        previewContainer = document.getElementById('video-preview-container');
        if (!previewContainer) {
            previewContainer = document.createElement('div');
            previewContainer.id = 'video-preview-container';
            previewContainer.className = 'video-preview-container';
            previewContainer.setAttribute('aria-hidden', 'true');
            
            previewVideo = document.createElement('video');
            previewVideo.id = 'video-preview';
            previewVideo.className = 'video-preview';
            previewVideo.muted = true;
            previewVideo.loop = true;
            previewVideo.playsInline = true;
            previewVideo.preload = 'metadata';
            previewVideo.textContent = 'Your browser does not support the video tag.';
            
            previewContainer.appendChild(previewVideo);
            document.body.appendChild(previewContainer);
        } else {
            previewVideo = document.getElementById('video-preview');
        }

        // Find all elements with data-video attribute
        const videoElements = document.querySelectorAll('[data-video]');
        
        // Attach event listeners to each element
        videoElements.forEach(function(element) {
            attachListeners(element);
        });

        // Global document click handler for touch devices (tap elsewhere to hide)
        if (isTouchDevice) {
            document.addEventListener('click', handleDocumentClick, true);
        }

        // Clean up on page unload
        window.addEventListener('beforeunload', cleanup);
    }

    /**
     * Attach event listeners to a video element
     */
    function attachListeners(element) {
        if (isTouchDevice) {
            // Touch devices: tap to show
            element.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleTouchActivate(element, e);
            }, { passive: false });
        } else {
            // Desktop: hover to show
            element.addEventListener('mouseenter', function(e) {
                handleMouseEnter(element, e);
            });

            element.addEventListener('mousemove', function(e) {
                handleMouseMove(e);
            });

            element.addEventListener('mouseleave', function(e) {
                handleMouseLeave();
            });
        }
    }

    /**
     * Handle mouse enter event (desktop)
     */
    function handleMouseEnter(element, event) {
        const videoSrc = element.getAttribute('data-video');
        if (!videoSrc) return;

        currentTarget = element;
        loadAndShowVideo(videoSrc, event.clientX, event.clientY);
    }

    /**
     * Handle mouse move event (desktop) - not needed for centered preview
     */
    function handleMouseMove(event) {
        // Preview is centered, no need to follow cursor
        return;
    }

    /**
     * Handle mouse leave event (desktop)
     */
    function handleMouseLeave() {
        hidePreview();
        currentTarget = null;
    }

    /**
     * Handle touch activate (mobile/tablet)
     */
    function handleTouchActivate(element, event) {
        const videoSrc = element.getAttribute('data-video');
        if (!videoSrc) return;

        // Toggle: if already showing this element, hide it
        if (currentTarget === element && previewContainer.classList.contains('active')) {
            hidePreview();
            currentTarget = null;
            return;
        }

        // Calculate position from touch event
        const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
        const x = touch ? touch.clientX : event.clientX;
        const y = touch ? touch.clientY : event.clientY;

        currentTarget = element;
        loadAndShowVideo(videoSrc, x, y);
    }

    /**
     * Handle document click for touch devices (tap elsewhere to hide)
     */
    function handleDocumentClick(event) {
        if (!previewContainer || !previewContainer.classList.contains('active')) {
            return;
        }

        // Check if click is outside the preview container and not on a data-video element
        const clickedElement = event.target;
        const isClickOnPreview = previewContainer.contains(clickedElement);
        const isClickOnVideoElement = clickedElement.closest('[data-video]');

        if (!isClickOnPreview && !isClickOnVideoElement) {
            hidePreview();
            currentTarget = null;
        }
    }

    /**
     * Load video and show preview
     */
    function loadAndShowVideo(videoSrc, x, y) {
        if (!previewVideo || !previewContainer) return;

        // Check if video source is different
        const currentSrc = previewVideo.src || previewVideo.getAttribute('src') || '';
        const newSrc = videoSrc;

        // Update video source if different
        if (currentSrc !== newSrc && currentSrc !== window.location.href + newSrc) {
            previewVideo.pause();
            previewVideo.currentTime = 0;
            previewVideo.src = newSrc;
            
            // Handle video load errors
            previewVideo.onerror = function() {
                console.warn('Failed to load video:', newSrc);
                hidePreview();
            };

            // Play when video is loaded
            previewVideo.onloadeddata = function() {
                showPreview();
                previewVideo.play().catch(function(error) {
                    console.warn('Video autoplay failed:', error);
                });
            };

            previewVideo.load();
        } else {
            // Same video, just show
            previewVideo.currentTime = 0;
            showPreview();
            previewVideo.play().catch(function(error) {
                console.warn('Video autoplay failed:', error);
            });
        }
    }

    /**
     * Update preview position - not needed for centered preview
     * Video is centered using CSS flexbox
     */
    function updatePreviewPosition(x, y) {
        // Preview is centered via CSS, no positioning needed
        return;
    }

    /**
     * Show preview with fade-in animation
     */
    function showPreview() {
        if (!previewContainer) return;
        previewContainer.classList.add('active');
        previewContainer.setAttribute('aria-hidden', 'false');
    }

    /**
     * Hide preview with fade-out animation
     */
    function hidePreview() {
        if (!previewContainer || !previewVideo) return;
        
        previewContainer.classList.remove('active');
        previewContainer.setAttribute('aria-hidden', 'true');
        
        // Pause video and reset
        previewVideo.pause();
        previewVideo.currentTime = 0;
    }

    /**
     * Cleanup function
     */
    function cleanup() {
        if (previewVideo) {
            previewVideo.pause();
            previewVideo.src = '';
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already loaded
        init();
    }

})();

