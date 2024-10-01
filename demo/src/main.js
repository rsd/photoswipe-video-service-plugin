import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipeYoutubePlugin from 'photo-swipe-youtube-plugin';

import 'photoswipe/dist/photoswipe.css';
// import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '.photoswipe-wrapper',
        children: '.photoswipe-item a',
        pswpModule: () => import('photoswipe'),
    });

    const videoPlugin = new PhotoSwipeYoutubePlugin(lightbox, {
        // Add any plugin options here
    });

    lightbox.init();
});
