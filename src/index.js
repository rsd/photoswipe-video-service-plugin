import { defaultOptions } from './default-options.js';
import YoutubeVideoSetup from './youtube-video-setup.js';

class PhotoSwipeYoutubePlugin {
    constructor(lightbox, options) {
        new YoutubeVideoSetup(lightbox, {
            ...defaultOptions,
            ...options
        });
    }
}

export default PhotoSwipeYoutubePlugin;
