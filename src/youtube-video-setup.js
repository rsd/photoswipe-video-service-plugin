function isYoutubeContent(content) {
    return content && content.data && (content.data.type === 'youtube' || content.type === 'youtube');
}

class YoutubeVideoSetup{
    constructor(lightbox, options) {
        this.options = options;
        this.youTubeAPIReady = false;
        this.youTubeAPILoading = false;
        this.youTubeAPIReadyCallbacks = [];

        console.log('YoutubeVideoSetup', lightbox, options);

        this.initLightboxEvents(lightbox);
        // lightbox.on('init', () => {
        //     this.initPswpEvents(lightbox.pswp);
        // });
    }

    initLightboxEvents(lightbox) {
        lightbox.on('contentLoad', this.onContentLoad.bind(this));
        // lightbox.on('contentDestroy', this.onContentDestroy.bind(this));
        // lightbox.on('contentActivate', this.onContentActivate.bind(this));
        // lightbox.on('contentDeactivate', this.onContentDeactivate.bind(this));
        // lightbox.on('contentAppend', this.onContentAppend.bind(this));
        // lightbox.on('contentResize', this.onContentResize.bind(this));
        //
        // lightbox.addFilter('isKeepingPlaceholder', this.isKeepingPlaceholder.bind(this));
        // lightbox.addFilter('isContentZoomable', this.isContentZoomable.bind(this));
        // lightbox.addFilter('useContentPlaceholder', this.useContentPlaceholder.bind(this));
        //
        // lightbox.addFilter('domItemData', (itemData, element, linkEl) => {
        //     const type = itemData.type;
        //
        //     if (type === 'video' || type === 'youtube' || type === 'vimeo') {
        //         if (linkEl.dataset.pswpVideoSources) {
        //             itemData.videoSources = JSON.parse(linkEl.dataset.pswpVideoSources);
        //         } else if (linkEl.dataset.pswpVideoSrc) {
        //             itemData.videoSrc = linkEl.dataset.pswpVideoSrc;
        //         } else if (linkEl.getAttribute('href')) {
        //             itemData.videoSrc = linkEl.getAttribute('href');
        //         }
        //     }
        //     return itemData;
        // });
    }

    onContentLoad(e) {
        const content = e.content;

        console.log(content);

        if (!isYoutubeContent(content)) {
            return;
        }

        e.preventDefault();

        // Check if content is already loading or loaded
        if (content.state === 'loading' || content.state === 'loaded') {
            return;
        }

        console.log(content.type, content.state);

        content.state = 'loading';
        content.type = 'youtube';
        this.loadYouTubeVideo(content);
    }

    onContentDestroy({ content }) {
        console.log('Destroying Content:', content);
        if (isYoutubeContent(content)) {
            if (content._videoPosterImg) {
                content._videoPosterImg.onload = null;
                content._videoPosterImg.onerror = null;
                content._videoPosterImg = null;
            }
            if (content.element) {
                if (content.data.type === 'youtube') {
                    if (content.player && typeof content.player.destroy === 'function') {
                        content.player.destroy();
                        content.player = null;
                    }
                    content.element = null;
                } else {
                    // Other video cleanup
                    content.element = null;
                }
            }
        }
    }

    loadYouTubeVideo(content) {
        this.loadYouTubeAPI().then(() => {
            console.log('YouTube IFrame API Loaded');

            // Create the player content
            const playerContainer = document.createElement('div');
            playerContainer.id = 'pswp-youtube-player-' + content.index;

            console.log(content.data.videoSrc, content.data.src);

            const videoId = this.extractYouTubeVideoId(content.data.videoSrc || content.data.src);

            console.log('Extracted Video ID:', videoId);

            if (!videoId) {
                console.error('Invalid YouTube URL');

                content.onError();
                return;
            }
            console.log('Creating YouTube Player');

            // Append the player container to the slide container immediately
            content.element = playerContainer;
            if (!content?.slide?.container) {
                console.error('No content.slide.container');
                return;
            }
            content.slide.container.appendChild(content.element);

            console.log(content);
            console.log(playerContainer.id);

            content.player = new YT.Player(playerContainer.id, {
                videoId: videoId,
                height: content.height,
                width: content.width,
                playerVars: {
                    autoplay: this.options.youtubeAttributes.autoplay ? 1 : 0,
                    controls: this.options.youtubeAttributes.controls ? 1 : 0,
                    rel: this.options.youtubeAttributes.rel ? 1 : 0,
                    playsinline: this.options.youtubeAttributes.playsinline ? 1 : 0,
                },
                events: {
                    'onReady': () => {
                        console.log('YouTube Player Ready');
                        content.onLoaded();
                    },
                    'onStateChange': (event) => {
                        console.log('Player State Changed:', event.data);
                    },
                    'onError': (error) => {
                        console.log('YouTube Player Error:', error);
                        content.onError();
                    },
                },
            });

        }).catch(() => {
            console.error('Failed to load YouTube IFrame API');
            content.onError();
        });
    }

    loadYouTubeAPI() {
        return new Promise((resolve) => {
            if (this.youTubeAPIReady) {
                resolve();
                return;
            }

            if (this.youTubeAPILoading) {
                this.youTubeAPIReadyCallbacks.push(resolve);
                return;
            }

            this.youTubeAPILoading = true;
            this.youTubeAPIReadyCallbacks.push(resolve);

            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.async = true;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            console.log('Loading YouTube IFrame API');

            // Define 'self' to capture the class instance
            const self = this;

            // Ensure 'onYouTubeIframeAPIReady' is accessible globally
            window.onYouTubeIframeAPIReady = function() {
                console.log('YouTube IFrame API Ready');
                self.youTubeAPIReady = true;
                self.youTubeAPILoading = false;
                self.youTubeAPIReadyCallbacks.forEach((callback) => callback());
                self.youTubeAPIReadyCallbacks = [];
            };
        });
    }

    extractYouTubeVideoId(url) {
        // const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        const match = url.match(regExp);
        return (match && match[1]) ? match[1] : null;
    }
}

export default YoutubeVideoSetup;