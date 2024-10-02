import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipeYoutubePlugin from 'photo-swipe-youtube-plugin';
import PhotoSwipeVimeoPlugin from 'photo-swipe-vimeo-plugin';

import 'photoswipe/dist/photoswipe.css';

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '.photoswipe-wrapper',
        children: '.photoswipe-item a',
        pswpModule: () => import('photoswipe'),
    });

    const youtube = new PhotoSwipeYoutubePlugin(lightbox, {
        youtubeAttributes: {
            autoplay: false
        },
    });

    const vimeo = new PhotoSwipeVimeoPlugin(lightbox, {
        vimeoAttributes: {
            autoplay: false
        },
    });

    lightbox.init();
});
