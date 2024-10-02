function isYoutubeContent(content) {
    return content && ((content.data && content.data.type === 'youtube')  || (content.type && content.type === 'youtube'));
}

class YoutubeVideoSetup{
    constructor(lightbox, options) {
        this.options = options;
        this.youTubeAPIReady = false;
        this.youTubeAPILoading = false;
        this.youTubeAPIReadyCallbacks = [];
        this.playerCounter = {};

        this.initLightboxEvents(lightbox);
        lightbox.on('init', () => {
            this.initPswpEvents(lightbox.pswp);
        });
    }

    initLightboxEvents(lightbox) {
        lightbox.on('contentLoad', this.onContentLoad.bind(this));
        lightbox.on('contentDestroy', this.onContentDestroy.bind(this));
        lightbox.on('contentActivate', this.onContentActivate.bind(this));
        lightbox.on('contentDeactivate', this.onContentDeactivate.bind(this));
        lightbox.on('contentAppend', this.onContentAppend.bind(this));
        lightbox.on('contentResize', this.onContentResize.bind(this));

        lightbox.addFilter('isKeepingPlaceholder', this.isKeepingPlaceholder.bind(this));
        lightbox.addFilter('isContentZoomable', this.isContentZoomable.bind(this));
        lightbox.addFilter('useContentPlaceholder', this.useContentPlaceholder.bind(this));

        lightbox.addFilter('domItemData', (itemData, element, linkEl) => {
             if (isYoutubeContent(itemData)) {
                 // FIXME: retest to see if still holds
                 if (linkEl.dataset.pswpVideoSources) {
                     itemData.videoSources = JSON.parse(linkEl.dataset.pswpVideoSources);
                 } else if (linkEl.dataset.pswpVideoSrc) {
                     itemData.videoSrc = linkEl.dataset.pswpVideoSrc;
                 } else if (linkEl.getAttribute('href')) {
                     itemData.videoSrc = linkEl.getAttribute('href');
                 }
             }
            return itemData;
         });
    }

    initPswpEvents(pswp) {
        pswp.on('appendHeavy', (e) => {
            if (isYoutubeContent(e.slide) && !e.slide.isActive) {
                e.preventDefault();
            }
        });

        pswp.on('close', () => {
            if (isYoutubeContent(pswp.currSlide.content)) {
                if (!pswp.options.showHideAnimationType || pswp.options.showHideAnimationType === 'zoom') {
                    pswp.options.showHideAnimationType = 'fade';
                }
                this.pauseVideo(pswp.currSlide.content);
            }
        });
    }

    /* Events */
    onContentLoad(e) {
        const content = e.content;

        if (!isYoutubeContent(content)) {
            return;
        }
        e.preventDefault();

        // Check if content is already loading or loaded
        if (content.state === 'loading' || content.state === 'loaded') {
            return;
        }

        content.state = 'loading';
        content.type = 'youtube';
        this.loadYouTubeVideo(content);
    }

    onContentDestroy({ content }) {
        if (isYoutubeContent(content)) {
            if (content._videoPosterImg) {
                content._videoPosterImg.onload = null;
                content._videoPosterImg.onerror = null;
                content._videoPosterImg = null;
            }
            if (content.element) {
                if (content.player && typeof content.player.destroy === 'function') {
                    content.player.destroy();
                    content.player = null;
                }
                content.element = null;
            }
        }
    }

    onContentActivate({ content }) {
        if (isYoutubeContent(content)) {
            if (content.player && typeof content.player.playVideo === 'function') {
                if (this.options.playOnActivate) {
                    content.player.playVideo();
                }
            }
        }
    }

    onContentDeactivate({ content }) {
        if (isYoutubeContent(content)) {
            if (content.player && typeof content.player.pauseVideo === 'function') {
                if (this.options.stopOnDeactivate) {
                    content.player.pauseVideo();
                }
            }
        }
    }

    onContentAppend(e) {
        const { content } = e;
        if (isYoutubeContent(content)) {
            e.preventDefault();
            if (content.status === 'not-appended'){
                content.status = 'appended';
                this.loadYouTubeVideo(content);
            }
        }
    }

    // FIXME: Onresize not working, maybe it shoudnt
    onContentResize(e) {
        if (isYoutubeContent(e.content)) {
            e.preventDefault();
        }
    }

    /* Filters */
    isKeepingPlaceholder(isKeepingPlaceholder, content) {
        if (isYoutubeContent(content)) {
            return false;
        }
        return isKeepingPlaceholder;
    }

    isContentZoomable(isContentZoomable, content) {
        if (isYoutubeContent(content)) {
            return false;
        }
        return isContentZoomable;
    }

    useContentPlaceholder(usePlaceholder, content) {
        if (isYoutubeContent(content)) {
            return false;
        }
        return usePlaceholder;
    }

    /* Player / YouTube */

    playVideo(content) {
        if (content.element && content.element.play) {
            content.element.play();
        }
    }

    pauseVideo(content) {
        if (content.element && content.element.pause) {
            content.element.pause();
        }
    }

    loadYouTubeVideo(content) {
        // Create the player content
        const playerContainer = document.createElement('div');
        playerContainer.id = 'pswp-youtube-player-' + content.index;
        // Append the player container to the slide container immediately
        content.element = playerContainer;

        this.loadYouTubeAPI().then(() => {
            const videoId = this.extractYouTubeVideoId(content.data.videoSrc || content.data.src);
            if (!videoId) {
                content.onError();
                return;
            }

            if (!content.slide) {
                content.status = 'not-appended';
                return;
            }

            content.slide.container.appendChild(content.element);

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
                        // The player might be loaded after the content was activated.
                        // Specially if it was the entry point
                        // In this case we need to start here.]
                        if (content.instance.currIndex === content.index && this.options.playOnActivate) {
                            content.player.playVideo();
                        }

                        content.onLoaded();
                    },
                    // 'onStateChange': (event) => {
                    //     console.log('Player State Changed:', event.data);
                    // },
                    'onError': (error) => {
                        content.onError();
                    },
                },
            });
            this.playerCounter[playerContainer.id] = content.player;
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
            // Code below only once

            this.youTubeAPILoading = true;
            this.youTubeAPIReadyCallbacks.push(resolve);

            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.async = true;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // Define 'self' to capture the class instance
            const self = this;

            // Ensure 'onYouTubeIframeAPIReady' is accessible globally
            window.onYouTubeIframeAPIReady = function() {
                self.youTubeAPIReady = true;
                self.youTubeAPILoading = false;
                // pending resolves
                self.youTubeAPIReadyCallbacks.forEach((callback) => callback());
                self.youTubeAPIReadyCallbacks = [];
            };
        });
    }

    extractYouTubeVideoId(url) {
        const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        return (match && match[1]) ? match[1] : null;
    }
}

export default YoutubeVideoSetup;