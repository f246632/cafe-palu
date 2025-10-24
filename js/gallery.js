/**
 * Café Palu - Gallery Lightbox Script
 * Handles image gallery with lightbox functionality
 */

document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // Gallery Lightbox
    // =============================================

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.dataset.image,
        alt: item.querySelector('img').alt
    }));

    // Open lightbox when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close lightbox when clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            showPreviousImage();
        });
    }

    // Next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextImage();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - show next image
                showNextImage();
            } else {
                // Swipe right - show previous image
                showPreviousImage();
            }
        }
    }

    // =============================================
    // Lightbox Functions
    // =============================================

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Preload adjacent images
        preloadImage(getPreviousIndex());
        preloadImage(getNextIndex());
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    function updateLightboxImage() {
        const image = images[currentImageIndex];

        // Add loading effect
        lightboxImage.style.opacity = '0';

        setTimeout(() => {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxImage.style.opacity = '1';
        }, 150);

        // Update navigation button visibility
        updateNavigationButtons();
    }

    function showPreviousImage() {
        currentImageIndex = getPreviousIndex();
        updateLightboxImage();
        preloadImage(getPreviousIndex());
    }

    function showNextImage() {
        currentImageIndex = getNextIndex();
        updateLightboxImage();
        preloadImage(getNextIndex());
    }

    function getPreviousIndex() {
        return currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    }

    function getNextIndex() {
        return currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    }

    function preloadImage(index) {
        const img = new Image();
        img.src = images[index].src;
    }

    function updateNavigationButtons() {
        // Show/hide navigation buttons based on current position
        // For circular navigation, always show both buttons
        if (lightboxPrev && lightboxNext) {
            lightboxPrev.style.display = images.length > 1 ? 'block' : 'none';
            lightboxNext.style.display = images.length > 1 ? 'block' : 'none';
        }
    }

    // =============================================
    // Image Counter (Optional Enhancement)
    // =============================================

    function createImageCounter() {
        const counter = document.createElement('div');
        counter.className = 'lightbox-counter';
        counter.style.cssText = `
            position: absolute;
            top: 2rem;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 1rem;
            font-weight: 600;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 0.5rem 1rem;
            border-radius: 20px;
        `;

        if (lightbox) {
            lightbox.appendChild(counter);
        }

        return counter;
    }

    const imageCounter = createImageCounter();

    function updateImageCounter() {
        if (imageCounter) {
            imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        }
    }

    // Update counter when image changes
    const originalUpdateLightboxImage = updateLightboxImage;
    updateLightboxImage = function() {
        originalUpdateLightboxImage();
        updateImageCounter();
    };

    // =============================================
    // Lazy Loading for Gallery Images
    // =============================================

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src || img.src;

                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('.gallery-item img').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // =============================================
    // Gallery Grid Animation on Scroll
    // =============================================

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 100);

                galleryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        galleryObserver.observe(item);
    });

    // =============================================
    // Image Error Handling
    // =============================================

    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('error', function() {
            console.error('Failed to load image:', this.src);

            // Set a placeholder or hide the gallery item
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23FAF3E0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%233E2723" font-size="16"%3EImage not available%3C/text%3E%3C/svg%3E';
            this.alt = 'Image not available';
        });
    });

    // =============================================
    // Gallery Categories/Filtering (Optional Future Enhancement)
    // =============================================

    // This can be implemented if you want to add category filtering
    // For example: Interior, Exterior, Food, Atmosphere

    /*
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    */

    // =============================================
    // Console Log
    // =============================================

    console.log(`Gallery initialized with ${images.length} images`);

});
