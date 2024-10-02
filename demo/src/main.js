import PhotoSwipeLightbox from 'photoswipe/lightbox';

// For individual plugins, use the correct class.
// import PhotoSwipeYoutubePlugin from 'photoswipe-youtube-plugin';
// import PhotoSwipeVimeoPlugin from 'photoswipe-vimeo-plugin';

import PhotoSwipeVideoServicePlugin from 'photoswipe-video-service-plugin';

import 'photoswipe/dist/photoswipe.css';

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '.photoswipe-wrapper',
        children: '.photoswipe-item a',
        pswpModule: () => import('photoswipe'),
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
