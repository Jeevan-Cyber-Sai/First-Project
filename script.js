// AR Platform JavaScript

// DOM Elements
const startARBtn = document.getElementById('startARBtn');
const heroARBtn = document.getElementById('heroARBtn');
const watchDemoBtn = document.getElementById('watchDemoBtn');
const arModal = document.getElementById('arModal');
const closeModal = document.getElementById('closeModal');
const arViewport = document.getElementById('arViewport');
const captureBtn = document.getElementById('captureBtn');
const toggleModelBtn = document.getElementById('toggleModelBtn');
const shareBtn = document.getElementById('shareBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');
const spidermanModal = document.getElementById('spidermanModal');
const closeSpidermanModal = document.getElementById('closeSpidermanModal');
const spidermanTriggers = document.querySelectorAll('.btn-view-spiderman');
const hulkModal = document.getElementById('hulkModal');
const closeHulkModal = document.getElementById('closeHulkModal');
const hulkTriggers = document.querySelectorAll('.btn-view-hulk');
const ironmanModal = document.getElementById('ironmanModal');
const closeIronmanModal = document.getElementById('closeIronmanModal');
const ironmanTriggers = document.querySelectorAll('.btn-view-ironman');

// AR State
let arActive = false;
let currentModelIndex = 0;
let stream = null;
let arModels = [
    { name: 'Furniture Model', color: '#6366f1' },
    { name: 'Product Model', color: '#ec4899' },
    { name: 'Educational Model', color: '#8b5cf6' },
    { name: 'Gaming Model', color: '#4facfe' }
];

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Update Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Open AR Modal
function openARModal() {
    arModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    initializeAR();
}

// Close AR Modal
function closeARModal() {
    arModal.classList.remove('active');
    document.body.style.overflow = '';
    stopAR();
}

// Spiderman model path (relative to page)
const SPIDERMAN_MODEL_SRC = 'spiderman/scene.gltf';

// Hulk model path (relative to page)
const HULK_MODEL_SRC = 'marvel_rivals_hulk_green_scar/scene.gltf';

// Iron Man model path (relative to page)
const IRONMAN_MODEL_SRC = 'iron_man (1)/scene.gltf';

// Open Spiderman AR Modal (model-viewer based)
function openSpidermanModal() {
    if (!spidermanModal) return;
    spidermanModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadSpidermanModalViewer();
}

// Close Spiderman AR Modal
function closeSpidermanModalFn() {
    if (!spidermanModal) return;
    spidermanModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Load model into modal viewer only when modal is open (avoids errors when viewer is hidden)
function loadSpidermanModalViewer() {
    const viewer = document.getElementById('spidermanViewer');
    const container = document.getElementById('spidermanViewerContainer');
    const loadingEl = document.getElementById('spidermanViewerLoading');
    const errorEl = document.getElementById('spidermanViewerError');
    if (!viewer || !container || !loadingEl || !errorEl) return;

    errorEl.style.display = 'none';
    loadingEl.style.display = 'flex';

    function onLoad() {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'none';
    }
    function onError() {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }

    if (viewer.src && viewer.src.indexOf(SPIDERMAN_MODEL_SRC) !== -1) {
        loadingEl.style.display = 'none';
        return;
    }

    viewer.setAttribute('src', SPIDERMAN_MODEL_SRC);
    viewer.setAttribute('ar', '');
    viewer.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
    viewer.addEventListener('load', onLoad, { once: true });
    viewer.addEventListener('error', onError, { once: true });
    setTimeout(function () {
        if (loadingEl.style.display !== 'none') {
            loadingEl.style.display = 'none';
        }
    }, 10000);
}

// Open Hulk AR Modal (model-viewer based)
function openHulkModal() {
    if (!hulkModal) return;
    hulkModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadHulkModalViewer();
}

// Close Hulk AR Modal
function closeHulkModalFn() {
    if (!hulkModal) return;
    hulkModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Load Hulk model into modal viewer
function loadHulkModalViewer() {
    const viewer = document.getElementById('hulkViewer');
    const container = document.getElementById('hulkViewerContainer');
    const loadingEl = document.getElementById('hulkViewerLoading');
    const errorEl = document.getElementById('hulkViewerError');
    if (!viewer || !container || !loadingEl || !errorEl) return;

    errorEl.style.display = 'none';
    loadingEl.style.display = 'flex';

    function onLoad() {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'none';
    }
    function onError() {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }

    if (viewer.src && viewer.src.indexOf(HULK_MODEL_SRC) !== -1) {
        loadingEl.style.display = 'none';
        return;
    }

    viewer.setAttribute('src', HULK_MODEL_SRC);
    viewer.setAttribute('ar', '');
    viewer.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
    viewer.addEventListener('load', onLoad, { once: true });
    viewer.addEventListener('error', onError, { once: true });
    setTimeout(function () {
        if (loadingEl.style.display !== 'none') {
            loadingEl.style.display = 'none';
        }
    }, 10000);
}

// Open Iron Man AR Modal (model-viewer based)
function openIronmanModal() {
    if (!ironmanModal) return;
    ironmanModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadIronmanModalViewer();
}

// Close Iron Man AR Modal
function closeIronmanModalFn() {
    if (!ironmanModal) return;
    ironmanModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Load Iron Man model into modal viewer
function loadIronmanModalViewer() {
    const viewer = document.getElementById('ironmanViewer');
    const container = document.getElementById('ironmanViewerContainer');
    const loadingEl = document.getElementById('ironmanViewerLoading');
    const errorEl = document.getElementById('ironmanViewerError');
    if (!viewer || !container || !loadingEl || !errorEl) return;

    errorEl.style.display = 'none';
    loadingEl.style.display = 'flex';

    function onLoad() {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'none';
    }
    function onError() {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }

    if (viewer.src && viewer.src.indexOf(IRONMAN_MODEL_SRC) !== -1) {
        loadingEl.style.display = 'none';
        return;
    }

    viewer.setAttribute('src', IRONMAN_MODEL_SRC);
    viewer.setAttribute('ar', '');
    viewer.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
    viewer.addEventListener('load', onLoad, { once: true });
    viewer.addEventListener('error', onError, { once: true });
    setTimeout(function () {
        if (loadingEl.style.display !== 'none') {
            loadingEl.style.display = 'none';
        }
    }, 10000);
}

// Initialize AR Experience
async function initializeAR() {
    try {
        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment', // Use back camera if available
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        // Create video element for camera feed
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';

        // Clear viewport and add video
        arViewport.innerHTML = '';
        arViewport.appendChild(video);

        // Add AR overlay elements
        addAROverlay();

        arActive = true;
    } catch (error) {
        console.error('Error accessing camera:', error);
        showARError('Camera access denied. Please allow camera permissions to use AR features.');
    }
}

// Add AR Overlay Elements
function addAROverlay() {
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '10';

    // Create AR object placeholder
    const arObject = document.createElement('div');
    arObject.id = 'arObject';
    arObject.style.position = 'absolute';
    arObject.style.top = '50%';
    arObject.style.left = '50%';
    arObject.style.transform = 'translate(-50%, -50%)';
    arObject.style.width = '200px';
    arObject.style.height = '200px';
    arObject.style.borderRadius = '16px';
    arObject.style.background = arModels[currentModelIndex].color;
    arObject.style.boxShadow = `0 0 40px ${arModels[currentModelIndex].color}`;
    arObject.style.animation = 'float-object 4s infinite ease-in-out';
    arObject.style.display = 'flex';
    arObject.style.alignItems = 'center';
    arObject.style.justifyContent = 'center';
    arObject.style.color = 'white';
    arObject.style.fontWeight = '600';
    arObject.style.fontSize = '1.2rem';
    arObject.textContent = arModels[currentModelIndex].name;

    overlay.appendChild(arObject);
    arViewport.appendChild(overlay);

    // Add CSS animation if not already added
    if (!document.getElementById('arAnimations')) {
        const style = document.createElement('style');
        style.id = 'arAnimations';
        style.textContent = `
            @keyframes float-object {
                0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
                50% { transform: translate(-50%, -50%) translateY(-20px) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Stop AR Experience
function stopAR() {
    arActive = false;
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    arViewport.innerHTML = `
        <div class="ar-placeholder">
            <div class="ar-loader">
                <div class="loader-spinner"></div>
                <p>Initializing AR Camera...</p>
                <small>Please allow camera access when prompted</small>
            </div>
        </div>
    `;
}

// Show AR Error
function showARError(message) {
    arViewport.innerHTML = `
        <div class="ar-placeholder">
            <div style="color: #ef4444; text-align: center;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem;">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">AR Unavailable</p>
                <small>${message}</small>
            </div>
        </div>
    `;
}

// Toggle AR Model
function toggleARModel() {
    currentModelIndex = (currentModelIndex + 1) % arModels.length;
    const arObject = document.getElementById('arObject');
    if (arObject) {
        arObject.style.background = arModels[currentModelIndex].color;
        arObject.style.boxShadow = `0 0 40px ${arModels[currentModelIndex].color}`;
        arObject.textContent = arModels[currentModelIndex].name;
    }
}

// Capture AR Scene
function captureARScene() {
    if (!arActive) return;

    const video = arViewport.querySelector('video');
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Add AR overlay to canvas
    const arObject = document.getElementById('arObject');
    if (arObject) {
        // Note: In a real implementation, you'd render the 3D model properly
        // This is a simplified version
    }

    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ar-capture-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);

        // Show success feedback
        showNotification('AR scene captured successfully!');
    }, 'image/png');
}

// Share AR Scene
async function shareARScene() {
    if (!arActive) {
        showNotification('Please start AR experience first');
        return;
    }

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'AR Experience',
                text: 'Check out this amazing AR experience!',
                url: window.location.href
            });
        } catch (error) {
            if (error.name !== 'AbortError') {
                showNotification('Sharing failed. Please try again.');
            }
        }
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showNotification('Link copied to clipboard!');
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.background = 'var(--bg-card)';
    notification.style.color = 'var(--text-primary)';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.border = '1px solid var(--border-color)';
    notification.style.boxShadow = 'var(--shadow-xl)';
    notification.style.zIndex = '3000';
    notification.style.animation = 'slideIn 0.3s ease-out';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Event Listeners
startARBtn.addEventListener('click', openARModal);
heroARBtn.addEventListener('click', openARModal);
watchDemoBtn.addEventListener('click', () => {
    showNotification('Demo video coming soon!');
});

closeModal.addEventListener('click', closeARModal);
arModal.addEventListener('click', (e) => {
    if (e.target === arModal) {
        closeARModal();
    }
});

captureBtn.addEventListener('click', captureARScene);
toggleModelBtn.addEventListener('click', toggleARModel);
shareBtn.addEventListener('click', shareARScene);

// Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Gallery Item AR Buttons
document.querySelectorAll('.btn-view-ar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openARModal();
    });
});

// Spiderman AR trigger buttons
spidermanTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openSpidermanModal();
    });
});

// Hulk AR trigger buttons
hulkTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openHulkModal();
    });
});

// Iron Man AR trigger buttons
ironmanTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openIronmanModal();
    });
});

// Spiderman AR modal close handlers
if (closeSpidermanModal && spidermanModal) {
    closeSpidermanModal.addEventListener('click', closeSpidermanModalFn);
    spidermanModal.addEventListener('click', (e) => {
        if (e.target === spidermanModal) {
            closeSpidermanModalFn();
        }
    });
}

// Hulk AR modal close handlers
if (closeHulkModal && hulkModal) {
    closeHulkModal.addEventListener('click', closeHulkModalFn);
    hulkModal.addEventListener('click', (e) => {
        if (e.target === hulkModal) {
            closeHulkModalFn();
        }
    });
}

// Iron Man AR modal close handlers
if (closeIronmanModal && ironmanModal) {
    closeIronmanModal.addEventListener('click', closeIronmanModalFn);
    ironmanModal.addEventListener('click', (e) => {
        if (e.target === ironmanModal) {
            closeIronmanModalFn();
        }
    });
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (arModal.classList.contains('active')) {
            closeARModal();
        }
        if (spidermanModal && spidermanModal.classList.contains('active')) {
            closeSpidermanModalFn();
        }
        if (hulkModal && hulkModal.classList.contains('active')) {
            closeHulkModalFn();
        }
        if (ironmanModal && ironmanModal.classList.contains('active')) {
            closeIronmanModalFn();
        }
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and gallery items
document.querySelectorAll('.feature-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Performance: Lazy load images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize Iron Man Preview Model
function initializeIronmanPreview() {
    const preview = document.getElementById('ironmanPreview');
    if (!preview) return;

    function onPreviewLoad() {
        preview.style.opacity = '1';
        preview.setAttribute('loaded', '');
    }
    function onPreviewError() {
        preview.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'image-placeholder ar-scene-4';
        fallback.style.background = 'linear-gradient(135deg, #b91c1c 0%, #b45309 100%)';
        fallback.style.display = 'flex';
        fallback.style.alignItems = 'center';
        fallback.style.justifyContent = 'center';
        fallback.style.fontSize = '4rem';
        fallback.style.opacity = '0.5';
        fallback.textContent = '🦾';
        preview.parentElement.insertBefore(fallback, preview);
    }

    if (customElements.get('model-viewer')) {
        preview.addEventListener('load', onPreviewLoad, { once: true });
        preview.addEventListener('error', onPreviewError, { once: true });
    } else {
        customElements.whenDefined('model-viewer').then(() => {
            preview.addEventListener('load', onPreviewLoad, { once: true });
            preview.addEventListener('error', onPreviewError, { once: true });
        });
    }
}

// Initialize Hulk Preview Model
function initializeHulkPreview() {
    const preview = document.getElementById('hulkPreview');
    if (!preview) return;

    function onPreviewLoad() {
        preview.style.opacity = '1';
        preview.setAttribute('loaded', '');
    }
    function onPreviewError() {
        preview.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'image-placeholder ar-scene-4';
        fallback.style.background = 'linear-gradient(135deg, #15803d 0%, #14532d 100%)';
        fallback.style.display = 'flex';
        fallback.style.alignItems = 'center';
        fallback.style.justifyContent = 'center';
        fallback.style.fontSize = '4rem';
        fallback.style.opacity = '0.5';
        fallback.textContent = '💪';
        preview.parentElement.insertBefore(fallback, preview);
    }

    if (customElements.get('model-viewer')) {
        preview.addEventListener('load', onPreviewLoad, { once: true });
        preview.addEventListener('error', onPreviewError, { once: true });
    } else {
        customElements.whenDefined('model-viewer').then(() => {
            preview.addEventListener('load', onPreviewLoad, { once: true });
            preview.addEventListener('error', onPreviewError, { once: true });
        });
    }
}

// Initialize Spiderman Preview Model
function initializeSpidermanPreview() {
    const preview = document.getElementById('spidermanPreview');
    if (!preview) return;

    function onPreviewLoad() {
        preview.style.opacity = '1';
        preview.setAttribute('loaded', '');
    }
    function onPreviewError() {
        preview.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'image-placeholder ar-scene-4';
        fallback.style.background = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
        fallback.style.display = 'flex';
        fallback.style.alignItems = 'center';
        fallback.style.justifyContent = 'center';
        fallback.style.fontSize = '4rem';
        fallback.style.opacity = '0.5';
        fallback.textContent = '🕷️';
        preview.parentElement.insertBefore(fallback, preview);
    }

    if (customElements.get('model-viewer')) {
        preview.addEventListener('load', onPreviewLoad, { once: true });
        preview.addEventListener('error', onPreviewError, { once: true });
    } else {
        customElements.whenDefined('model-viewer').then(() => {
            preview.addEventListener('load', onPreviewLoad, { once: true });
            preview.addEventListener('error', onPreviewError, { once: true });
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('AR Platform initialized');
    
    // Initialize Spiderman preview
    initializeSpidermanPreview();
    // Initialize Hulk preview
    initializeHulkPreview();
    // Initialize Iron Man preview
    initializeIronmanPreview();
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
