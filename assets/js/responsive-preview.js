/**
 * Responsive Design Preview Overlay System
 * Shows the Responsive Layout Simulator when hovering over "Responsive Design" button
 * Desktop: Hover to show
 * Mobile: Click to show mobile preview overlay
 */

(function() {
    'use strict';

    // State
    let previewOverlay = null;
    let previewOverlayMobile = null;
    let currentTarget = null;
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    /**
     * Check if device is mobile
     */
    function isMobile() {
        return window.innerWidth <= 820 || isTouchDevice;
    }

    /**
     * Initialize the responsive preview system
     */
    function init() {
        // Get preview overlays
        previewOverlay = document.getElementById('responsive-preview-overlay');
        previewOverlayMobile = document.getElementById('responsive-preview-overlay-mobile');
        
        if (!previewOverlay && !previewOverlayMobile) {
            console.warn('Responsive preview overlays not found');
            return;
        }

        // Find all elements with data-responsive-preview attribute
        const previewElements = document.querySelectorAll('[data-responsive-preview]');
        
        // Attach event listeners to each element
        previewElements.forEach(function(element) {
            attachListeners(element);
        });

        // Setup close button for mobile overlay
        if (previewOverlayMobile) {
            const closeButton = previewOverlayMobile.querySelector('.responsive-preview-close-mobile');
            if (closeButton) {
                closeButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    hidePreview();
                });
            }
        }

        // Global document click handler for touch devices (tap elsewhere to hide)
        if (isTouchDevice) {
            document.addEventListener('click', handleDocumentClick, true);
        }
    }

    /**
     * Attach event listeners to a preview element
     */
    function attachListeners(element) {
        if (isMobile()) {
            // Mobile: tap to show mobile overlay
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

            element.addEventListener('mouseleave', function(e) {
                handleMouseLeave();
            });
        }
    }

    /**
     * Handle mouse enter event (desktop)
     */
    function handleMouseEnter(element, event) {
        currentTarget = element;
        showPreview();
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
        const activeOverlay = isMobile() ? previewOverlayMobile : previewOverlay;
        
        if (!activeOverlay) return;
        
        // Toggle: if already showing this element, hide it
        if (currentTarget === element && activeOverlay.classList.contains('active')) {
            hidePreview();
            currentTarget = null;
            return;
        }

        currentTarget = element;
        showPreview();
    }

    /**
     * Handle document click for touch devices (tap elsewhere to hide)
     */
    function handleDocumentClick(event) {
        const activeOverlay = isMobile() ? previewOverlayMobile : previewOverlay;
        
        if (!activeOverlay || !activeOverlay.classList.contains('active')) {
            return;
        }

        // Check if click is outside the preview overlay and not on a data-responsive-preview element
        const clickedElement = event.target;
        const isClickOnPreview = activeOverlay.contains(clickedElement);
        const isClickOnPreviewElement = clickedElement.closest('[data-responsive-preview]');
        const isClickOnCloseButton = clickedElement.classList.contains('responsive-preview-close-mobile');

        if (!isClickOnPreview && !isClickOnPreviewElement && !isClickOnCloseButton) {
            hidePreview();
            currentTarget = null;
        }
    }

    /**
     * Show preview with fade-in animation
     */
    function showPreview() {
        const isMobileDevice = isMobile();
        const overlay = isMobileDevice ? previewOverlayMobile : previewOverlay;
        
        if (!overlay) return;
        
        // Hide the other overlay if it's active
        if (isMobileDevice && previewOverlay) {
            previewOverlay.classList.remove('active');
            previewOverlay.setAttribute('aria-hidden', 'true');
        } else if (!isMobileDevice && previewOverlayMobile) {
            previewOverlayMobile.classList.remove('active');
            previewOverlayMobile.setAttribute('aria-hidden', 'true');
        }
        
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
    }

    /**
     * Hide preview with fade-out animation
     */
    function hidePreview() {
        if (previewOverlay) {
            previewOverlay.classList.remove('active');
            previewOverlay.setAttribute('aria-hidden', 'true');
        }
        
        if (previewOverlayMobile) {
            previewOverlayMobile.classList.remove('active');
            previewOverlayMobile.setAttribute('aria-hidden', 'true');
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
