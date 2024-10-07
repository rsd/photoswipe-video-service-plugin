import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from '../../node_modules/photoswipe/dist/photoswipe.esm.js';

// For individual plugins, use the correct class.
// import PhotoSwipeYoutubePlugin from 'photoswipe-youtube-plugin';
// import PhotoSwipeVimeoPlugin from 'photoswipe-vimeo-plugin';

import PhotoSwipeVideoServicePlugin from '../../dist/photoswipe-video-service-plugin.esm.js';

import 'photoswipe/dist/photoswipe.css';

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '.photoswipe-wrapper',
        children: '.photoswipe-item a',
        pswpModule: () => PhotoSwipe,
    });

    // You can either use the Video Service Plugin or the individual YouTube and Vimeo plugins
    new PhotoSwipeVideoServicePlugin(lightbox, {
        youtubeAttributes: {
            autoplay: false,
        },
        vimeoAttributes: {
            autoplay: false,
        },
        playOnActivate: true,
    });

    /* For individual plugins
    const youtube = new PhotoSwipeYoutubePlugin(lightbox, {
        youtubeAttributes: {
            autoplay: false
        },
        playOnActivate: true,
    });

    const vimeo = new PhotoSwipeVimeoPlugin(lightbox, {
        vimeoAttributes: {
            autoplay: false
        },
        playOnActivate: true,
    });
    */

    lightbox.init();
});
