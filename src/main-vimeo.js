import { defaultOptions } from './default-options.js';
import VimeoVideoSetup from './vimeo-video-setup.js';

class PhotoSwipeVimeoPlugin {
    constructor(lightbox, options) {
        new VimeoVideoSetup(lightbox, {
            ...defaultOptions,
            ...options
        });
    }
}

export default PhotoSwipeVimeoPlugin;
