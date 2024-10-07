# PhotoSwipe Video Service Plugin

**PhotoSwipe Video Service Plugin** is a plugin for [PhotoSwipe](https://photoswipe.com/) that adds seamless support 
for YouTube and Vimeo videos within your galleries. 
This plugin allows you to integrate both video services effortlessly, 
enhancing the user experience by providing video playback alongside images.

## Features

- Supports both YouTube and Vimeo videos.
- Easy integration with PhotoSwipe galleries.
- Customizable options for autoplay, controls, and other player attributes.
- Plays videos on activation and pauses on deactivation.
- Handles multiple video services with a unified interface.

## Installation

Install the plugin via npm:

`npm install git+https://github.com/rsd/photoswipe-video-service-plugin.git`

Or include the script directly in your HTML:

### umd style
`<script src="path/to/PhotoSwipeVideoServicePlugin.js"></script>`

### esd style
`<script src="path/to/photoswipe-video-service-plugin.esm.js"></script>`


### JavaScript

```javascript
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from '../../node_modules/photoswipe/dist/photoswipe.esm.js';
import PhotoSwipeVideoServicePlugin from 'photoswipe-video-service-plugin';

import 'photoswipe/dist/photoswipe.css';

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: '.photoswipe-wrapper',
    children: '.photoswipe-item a',
    pswpModule: () => PhotoSwipe,
  });

  new PhotoSwipeVideoServicePlugin(lightbox, {
    youtubeAttributes: {
      autoplay: false,
    },
    vimeoAttributes: {
      autoplay: false,
    },
    playOnActivate: true,
  });

  lightbox.init();
});
```

### HTML

Structure your gallery items with links to YouTube and Vimeo videos.

```html
<div class="photoswipe-wrapper">
    <!-- YouTube Video -->
    <div class="photoswipe-item">
        <a href="https://www.youtube.com/watch?v=VIDEO_ID" data-pswp-type="youtube" data-pswp-width="WIDTH" data-pswp-height="HEIGHT">
            <img src="youtube-thumbnail.jpg" alt="YouTube Video">
        </a>
    </div>

    <!-- Vimeo Video -->
    <div class="photoswipe-item">
        <a href="https://vimeo.com/VIDEO_ID" data-pswp-type="vimeo" data-pswp-width="WIDTH" data-pswp-height="HEIGHT">
            <img src="vimeo-thumbnail.jpg" alt="Vimeo Video">
        </a>
    </div>

    <!-- Image -->
    <div class="photoswipe-item">
        <a href="path/to/image.jpg" data-pswp-type="image" data-pswp-width="WIDTH" data-pswp-height="HEIGHT">
            <img src="image-thumbnail.jpg" alt="Image">
        </a>
    </div>
</div>
```

### Options

You can customize the plugin using the following options:

- `youtubeAttributes`: Options for YouTube videos.
- `vimeoAttributes`: Options for Vimeo videos.
- `playOnActivate` (boolean): Whether to play the video automatically when activated.
- `stopOnDeactivate` (boolean): Whether to pause the video when deactivated.

#### Example Options

```javascript
new PhotoSwipeVideoServicePlugin(lightbox, {
    youtubeAttributes: {
        autoplay: true,
        controls: true,
        rel: false,
    },
    vimeoAttributes: {
        autoplay: true,
        loop: false,
        controls: true,
    },
    playOnActivate: true,
    stopOnDeactivate: true,
});
```

## Building the Plugin

If you want to build the plugin from source:

1. **Clone the repository:**

   `git clone https://github.com/rsd/photoswipe-video-service-plugin.git`

2. **Install dependencies:**

   `npm install`

3. **Build the plugin using Webpack:**

   `webpack --config webpack.config.js`

The built files will be in the `dist` directory.

## Demo Project

A Demonstration project is included in the `demo` directory.
To start the demo project:

`npm run demo`

Then open `http://localhost:9000` in your browser.

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgments

- Dmytro Semenov for creating [PhotoSwipe](https://photoswipe.com/).  This project was heavily inspired by his work.
- [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)
- [Vimeo Player API](https://developer.vimeo.com/player/sdk)
