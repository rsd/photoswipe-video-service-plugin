export const defaultOptions = {
    // YouTube API attributes
    youtubeAttributes: {
        controls: false,
        playsinline: true,
        preload: 'auto',
        autoplay: false,
        rel: false
    },
    // Vimeo Options
    vimeoAttributes: {
        autoplay: false,
        loop: false,
        controls: true,
    },
    playOnActivate: true, // Only starts the video when the slide is activated
    stopOnDeactivate: true, // Stops the video when the slide is deactivated


    // prevent drag/swipe gesture over the bottom part of video
    // set to 0 to disable
    preventDragOffset: 40
};
