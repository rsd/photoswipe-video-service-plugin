import { defaultOptions } from './default-options.js';
import YoutubeVideoSetup from './youtube-video-setup.js';
import VimeoVideoSetup from './vimeo-video-setup.js';

class PhotoSwipeVideoServicePlugin {
    constructor(lightbox, options) {
        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        // Initialize YouTube and Vimeo setups
        this.youtubeSetup = new YoutubeVideoSetup(lightbox, mergedOptions);
        this.vimeoSetup = new VimeoVideoSetup(lightbox, mergedOptions);
    }
}

export default PhotoSwipeVideoServicePlugin;
