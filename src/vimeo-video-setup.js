function isVimeoContent(content) {
    return content && ((content.data && content.data.type === 'vimeo')  || (content.type && content.type === 'vimeo'));
}

class VimeoVideoSetup {
    constructor(lightbox, options) {
        this.options = options;
        this.vimeoAPIReady = false;
        this.vimeoAPILoading = false;
        this.vimeoAPIReadyCallbacks = [];
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
            if (isVimeoContent(itemData)) {
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
            if (isVimeoContent(e.slide) && !e.slide.isActive) {
                e.preventDefault();
            }
        });

        pswp.on('close', () => {
            if (isVimeoContent(pswp.currSlide.content)) {
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

        if (!isVimeoContent(content)) {
            return;
        }
        e.preventDefault();

        if (content.state === 'loading' || content.state === 'loaded') {
            return;
        }

        content.state = 'loading';
        content.type = 'vimeo';
        this.loadVimeoVideo(content);
    }

    onContentDestroy({ content }) {
        if (isVimeoContent(content)) {
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
        if (isVimeoContent(content)) {
            if (content.player && typeof content.player.play === 'function') {
                if (this.options.playOnActivate) {
                    content.player.play();
                }
            }
        }
    }

    onContentDeactivate({ content }) {
        if (isVimeoContent(content)) {
            if (content.player && typeof content.player.pause === 'function') {
                if (this.options.stopOnDeactivate) {
                    content.player.pause();
                }
            }
        }
    }

    onContentAppend(e) {
        const { content } = e;
        if (isVimeoContent(content)) {
            e.preventDefault();
            if (content.status === 'not-appended') {
                content.status = 'appended';
                this.loadVimeoVideo(content);
            }
        }
    }

    onContentResize(e) {
        if (isVimeoContent(e.content)) {
            e.preventDefault();
        }
    }

    /* Filters */
    isKeepingPlaceholder(isKeepingPlaceholder, content) {
        if (isVimeoContent(content)) {
            return false;
        }
        return isKeepingPlaceholder;
    }

    isContentZoomable(isContentZoomable, content) {
        if (isVimeoContent(content)) {
            return false;
        }
        return isContentZoomable;
    }

    useContentPlaceholder(usePlaceholder, content) {
        if (isVimeoContent(content)) {
            return false;
        }
        return usePlaceholder;
    }

    /* Player / Vimeo */

    playVideo(content) {
        if (content.player && typeof content.player.play === 'function') {
            content.player.play();
        }
    }

    pauseVideo(content) {
        if (content.player && typeof content.player.pause === 'function') {
            content.player.pause();
        }
    }

    loadVimeoVideo(content) {
        const playerContainer = document.createElement('div');
        playerContainer.id = 'pswp-vimeo-player-' + content.index;
        content.element = playerContainer;

        this.loadVimeoAPI().then(() => {
            const videoId = this.extractVimeoVideoId(content.data.videoSrc || content.data.src);
            if (!videoId) {
                content.onError();
                return;
            }

            if (!content.slide) {
                content.status = 'not-appended';
                return;
            }

            content.slide.container.appendChild(content.element);

            const options = {
                id: videoId,
                width: content.width,
                autoplay: this.options.vimeoAttributes.autoplay ? true : false,
                loop: this.options.vimeoAttributes.loop ? true : false,
                controls: this.options.vimeoAttributes.controls ? true : false,
            };

            content.player = new Vimeo.Player(playerContainer, options);

            content.player.ready().then(() => {
                if (content.instance.currIndex === content.index && this.options.playOnActivate) {
                    content.player.play();
                }
                content.onLoaded();
            }).catch((error) => {
                content.onError();
            });

            this.playerCounter[playerContainer.id] = content.player;
        });
    }

    loadVimeoAPI() {
        return new Promise((resolve) => {
            if (this.vimeoAPIReady) {
                resolve();
                return;
            }

            if (this.vimeoAPILoading) {
                this.vimeoAPIReadyCallbacks.push(resolve);
                return;
            }

            this.vimeoAPILoading = true;
            this.vimeoAPIReadyCallbacks.push(resolve);

            const tag = document.createElement('script');
            tag.src = 'https://player.vimeo.com/api/player.js';
            tag.async = true;

            tag.onload = () => {
                this.vimeoAPIReady = true;
                this.vimeoAPILoading = false;
                this.vimeoAPIReadyCallbacks.forEach((callback) => callback());
                this.vimeoAPIReadyCallbacks = [];
            };

            tag.onerror = () => {
                this.vimeoAPILoading = false;
                this.vimeoAPIReadyCallbacks = [];
            };

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        });
    }

    extractVimeoVideoId(url) {
        const regExp = /vimeo.*(?:\/|clip_id=)([0-9]+)/i;
        const match = url.match(regExp);
        return (match && match[1]) ? match[1] : null;
    }
}

export default VimeoVideoSetup;
