var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{A:()=>A});var n={youtubeAttributes:{controls:!1,playsinline:!0,preload:"auto",autoplay:!1,rel:!1},vimeoAttributes:{autoplay:!1,loop:!1,controls:!0},playOnActivate:!0,stopOnDeactivate:!0,preventDragOffset:40};function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,r(o.key),o)}}function r(e){var t=function(e){if("object"!=o(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==o(t)?t:t+""}function a(e){return e&&(e.data&&"youtube"===e.data.type||e.type&&"youtube"===e.type)}const u=function(){return e=function e(t,n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=n,this.youTubeAPIReady=!1,this.youTubeAPILoading=!1,this.youTubeAPIReadyCallbacks=[],this.playerCounter={},this.initLightboxEvents(t),t.on("init",(function(){o.initPswpEvents(t.pswp)}))},t=[{key:"initLightboxEvents",value:function(e){e.on("contentLoad",this.onContentLoad.bind(this)),e.on("contentDestroy",this.onContentDestroy.bind(this)),e.on("contentActivate",this.onContentActivate.bind(this)),e.on("contentDeactivate",this.onContentDeactivate.bind(this)),e.on("contentAppend",this.onContentAppend.bind(this)),e.on("contentResize",this.onContentResize.bind(this)),e.addFilter("isKeepingPlaceholder",this.isKeepingPlaceholder.bind(this)),e.addFilter("isContentZoomable",this.isContentZoomable.bind(this)),e.addFilter("useContentPlaceholder",this.useContentPlaceholder.bind(this)),e.addFilter("domItemData",(function(e,t,n){return a(e)&&(n.dataset.pswpVideoSources?e.videoSources=JSON.parse(n.dataset.pswpVideoSources):n.dataset.pswpVideoSrc?e.videoSrc=n.dataset.pswpVideoSrc:n.getAttribute("href")&&(e.videoSrc=n.getAttribute("href"))),e}))}},{key:"initPswpEvents",value:function(e){var t=this;e.on("appendHeavy",(function(e){a(e.slide)&&!e.slide.isActive&&e.preventDefault()})),e.on("close",(function(){a(e.currSlide.content)&&(e.options.showHideAnimationType&&"zoom"!==e.options.showHideAnimationType||(e.options.showHideAnimationType="fade"),t.pauseVideo(e.currSlide.content))}))}},{key:"onContentLoad",value:function(e){var t=e.content;a(t)&&(e.preventDefault(),"loading"!==t.state&&"loaded"!==t.state&&(t.state="loading",t.type="youtube",this.loadYouTubeVideo(t)))}},{key:"onContentDestroy",value:function(e){var t=e.content;a(t)&&(t._videoPosterImg&&(t._videoPosterImg.onload=null,t._videoPosterImg.onerror=null,t._videoPosterImg=null),t.element&&(t.player&&"function"==typeof t.player.destroy&&(t.player.destroy(),t.player=null),t.element=null))}},{key:"onContentActivate",value:function(e){var t=e.content;a(t)&&t.player&&"function"==typeof t.player.playVideo&&this.options.playOnActivate&&t.player.playVideo()}},{key:"onContentDeactivate",value:function(e){var t=e.content;a(t)&&t.player&&"function"==typeof t.player.pauseVideo&&this.options.stopOnDeactivate&&t.player.pauseVideo()}},{key:"onContentAppend",value:function(e){var t=e.content;a(t)&&(e.preventDefault(),"not-appended"===t.status&&(t.status="appended",this.loadYouTubeVideo(t)))}},{key:"onContentResize",value:function(e){a(e.content)&&e.preventDefault()}},{key:"isKeepingPlaceholder",value:function(e,t){return!a(t)&&e}},{key:"isContentZoomable",value:function(e,t){return!a(t)&&e}},{key:"useContentPlaceholder",value:function(e,t){return!a(t)&&e}},{key:"playVideo",value:function(e){e.element&&e.element.play&&e.element.play()}},{key:"pauseVideo",value:function(e){e.element&&e.element.pause&&e.element.pause()}},{key:"loadYouTubeVideo",value:function(e){var t=this,n=document.createElement("div");n.id="pswp-youtube-player-"+e.index,e.element=n,this.loadYouTubeAPI().then((function(){var o=t.extractYouTubeVideoId(e.data.videoSrc||e.data.src);o?e.slide?(e.slide.container.appendChild(e.element),e.player=new YT.Player(n.id,{videoId:o,height:e.height,width:e.width,playerVars:{autoplay:t.options.youtubeAttributes.autoplay?1:0,controls:t.options.youtubeAttributes.controls?1:0,rel:t.options.youtubeAttributes.rel?1:0,playsinline:t.options.youtubeAttributes.playsinline?1:0},events:{onReady:function(){e.instance.currIndex===e.index&&t.options.playOnActivate&&e.player.playVideo(),e.onLoaded()},onError:function(t){e.onError()}}}),t.playerCounter[n.id]=e.player):e.status="not-appended":e.onError()}))}},{key:"loadYouTubeAPI",value:function(){var e=this;return new Promise((function(t){if(e.youTubeAPIReady)t();else if(e.youTubeAPILoading)e.youTubeAPIReadyCallbacks.push(t);else{e.youTubeAPILoading=!0,e.youTubeAPIReadyCallbacks.push(t);var n=document.createElement("script");n.src="https://www.youtube.com/iframe_api",n.async=!0;var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o);var i=e;window.onYouTubeIframeAPIReady=function(){i.youTubeAPIReady=!0,i.youTubeAPILoading=!1,i.youTubeAPIReadyCallbacks.forEach((function(e){return e()})),i.youTubeAPIReadyCallbacks=[]}}}))}},{key:"extractYouTubeVideoId",value:function(e){var t=e.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);return t&&t[1]?t[1]:null}}],t&&i(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,c(o.key),o)}}function c(e){var t=function(e){if("object"!=l(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=l(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==l(t)?t:t+""}function p(e){return e&&(e.data&&"vimeo"===e.data.type||e.type&&"vimeo"===e.type)}const d=function(){return e=function e(t,n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=n,this.vimeoAPIReady=!1,this.vimeoAPILoading=!1,this.vimeoAPIReadyCallbacks=[],this.playerCounter={},this.initLightboxEvents(t),t.on("init",(function(){o.initPswpEvents(t.pswp)}))},t=[{key:"initLightboxEvents",value:function(e){e.on("contentLoad",this.onContentLoad.bind(this)),e.on("contentDestroy",this.onContentDestroy.bind(this)),e.on("contentActivate",this.onContentActivate.bind(this)),e.on("contentDeactivate",this.onContentDeactivate.bind(this)),e.on("contentAppend",this.onContentAppend.bind(this)),e.on("contentResize",this.onContentResize.bind(this)),e.addFilter("isKeepingPlaceholder",this.isKeepingPlaceholder.bind(this)),e.addFilter("isContentZoomable",this.isContentZoomable.bind(this)),e.addFilter("useContentPlaceholder",this.useContentPlaceholder.bind(this)),e.addFilter("domItemData",(function(e,t,n){return p(e)&&(n.dataset.pswpVideoSources?e.videoSources=JSON.parse(n.dataset.pswpVideoSources):n.dataset.pswpVideoSrc?e.videoSrc=n.dataset.pswpVideoSrc:n.getAttribute("href")&&(e.videoSrc=n.getAttribute("href"))),e}))}},{key:"initPswpEvents",value:function(e){var t=this;e.on("appendHeavy",(function(e){p(e.slide)&&!e.slide.isActive&&e.preventDefault()})),e.on("close",(function(){p(e.currSlide.content)&&(e.options.showHideAnimationType&&"zoom"!==e.options.showHideAnimationType||(e.options.showHideAnimationType="fade"),t.pauseVideo(e.currSlide.content))}))}},{key:"onContentLoad",value:function(e){var t=e.content;p(t)&&(e.preventDefault(),"loading"!==t.state&&"loaded"!==t.state&&(t.state="loading",t.type="vimeo",this.loadVimeoVideo(t)))}},{key:"onContentDestroy",value:function(e){var t=e.content;p(t)&&(t._videoPosterImg&&(t._videoPosterImg.onload=null,t._videoPosterImg.onerror=null,t._videoPosterImg=null),t.element&&(t.player&&"function"==typeof t.player.destroy&&(t.player.destroy(),t.player=null),t.element=null))}},{key:"onContentActivate",value:function(e){var t=e.content;p(t)&&t.player&&"function"==typeof t.player.play&&this.options.playOnActivate&&t.player.play()}},{key:"onContentDeactivate",value:function(e){var t=e.content;p(t)&&t.player&&"function"==typeof t.player.pause&&this.options.stopOnDeactivate&&t.player.pause()}},{key:"onContentAppend",value:function(e){var t=e.content;p(t)&&(e.preventDefault(),"not-appended"===t.status&&(t.status="appended",this.loadVimeoVideo(t)))}},{key:"onContentResize",value:function(e){p(e.content)&&e.preventDefault()}},{key:"isKeepingPlaceholder",value:function(e,t){return!p(t)&&e}},{key:"isContentZoomable",value:function(e,t){return!p(t)&&e}},{key:"useContentPlaceholder",value:function(e,t){return!p(t)&&e}},{key:"playVideo",value:function(e){e.player&&"function"==typeof e.player.play&&e.player.play()}},{key:"pauseVideo",value:function(e){e.player&&"function"==typeof e.player.pause&&e.player.pause()}},{key:"loadVimeoVideo",value:function(e){var t=this,n=document.createElement("div");n.id="pswp-vimeo-player-"+e.index,e.element=n,this.loadVimeoAPI().then((function(){var o=t.extractVimeoVideoId(e.data.videoSrc||e.data.src);if(o)if(e.slide){e.slide.container.appendChild(e.element);var i={id:o,width:e.width,autoplay:!!t.options.vimeoAttributes.autoplay,loop:!!t.options.vimeoAttributes.loop,controls:!!t.options.vimeoAttributes.controls};e.player=new Vimeo.Player(n,i),e.player.ready().then((function(){e.instance.currIndex===e.index&&t.options.playOnActivate&&e.player.play(),e.onLoaded()})).catch((function(t){e.onError()})),t.playerCounter[n.id]=e.player}else e.status="not-appended";else e.onError()}))}},{key:"loadVimeoAPI",value:function(){var e=this;return new Promise((function(t){if(e.vimeoAPIReady)t();else if(e.vimeoAPILoading)e.vimeoAPIReadyCallbacks.push(t);else{e.vimeoAPILoading=!0,e.vimeoAPIReadyCallbacks.push(t);var n=document.createElement("script");n.src="https://player.vimeo.com/api/player.js",n.async=!0,n.onload=function(){e.vimeoAPIReady=!0,e.vimeoAPILoading=!1,e.vimeoAPIReadyCallbacks.forEach((function(e){return e()})),e.vimeoAPIReadyCallbacks=[]},n.onerror=function(){e.vimeoAPILoading=!1,e.vimeoAPIReadyCallbacks=[]};var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o)}}))}},{key:"extractVimeoVideoId",value:function(e){var t=e.match(/vimeo.*(?:\/|clip_id=)([0-9]+)/i);return t&&t[1]?t[1]:null}}],t&&s(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}();function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return(t=P(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,P(o.key),o)}}function h(e,t,n){return t&&m(e.prototype,t),n&&m(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function P(e){var t=function(e){if("object"!=y(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=y(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==y(t)?t:t+""}const A=h((function e(t,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var i=v(v({},n),o);this.youtubeSetup=new u(t,i),this.vimeoSetup=new d(t,i)}));var g=t.A;export{g as default};