var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{A:()=>v});var n={youtubeAttributes:{controls:!1,playsinline:!0,preload:"auto",autoplay:!1,rel:!1},vimeoAttributes:{autoplay:!1,loop:!1,controls:!0},playOnActivate:!0,stopOnDeactivate:!0,preventDragOffset:40};function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,r(o.key),o)}}function r(e){var t=function(e){if("object"!=o(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==o(t)?t:t+""}function a(e){return e&&(e.data&&"vimeo"===e.data.type||e.type&&"vimeo"===e.type)}const l=function(){return e=function e(t,n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=n,this.vimeoAPIReady=!1,this.vimeoAPILoading=!1,this.vimeoAPIReadyCallbacks=[],this.playerCounter={},this.initLightboxEvents(t),t.on("init",(function(){o.initPswpEvents(t.pswp)}))},t=[{key:"initLightboxEvents",value:function(e){e.on("contentLoad",this.onContentLoad.bind(this)),e.on("contentDestroy",this.onContentDestroy.bind(this)),e.on("contentActivate",this.onContentActivate.bind(this)),e.on("contentDeactivate",this.onContentDeactivate.bind(this)),e.on("contentAppend",this.onContentAppend.bind(this)),e.on("contentResize",this.onContentResize.bind(this)),e.addFilter("isKeepingPlaceholder",this.isKeepingPlaceholder.bind(this)),e.addFilter("isContentZoomable",this.isContentZoomable.bind(this)),e.addFilter("useContentPlaceholder",this.useContentPlaceholder.bind(this)),e.addFilter("domItemData",(function(e,t,n){return a(e)&&(n.dataset.pswpVideoSources?e.videoSources=JSON.parse(n.dataset.pswpVideoSources):n.dataset.pswpVideoSrc?e.videoSrc=n.dataset.pswpVideoSrc:n.getAttribute("href")&&(e.videoSrc=n.getAttribute("href"))),e}))}},{key:"initPswpEvents",value:function(e){var t=this;e.on("appendHeavy",(function(e){a(e.slide)&&!e.slide.isActive&&e.preventDefault()})),e.on("close",(function(){a(e.currSlide.content)&&(e.options.showHideAnimationType&&"zoom"!==e.options.showHideAnimationType||(e.options.showHideAnimationType="fade"),t.pauseVideo(e.currSlide.content))}))}},{key:"onContentLoad",value:function(e){var t=e.content;a(t)&&(e.preventDefault(),"loading"!==t.state&&"loaded"!==t.state&&(t.state="loading",t.type="vimeo",this.loadVimeoVideo(t)))}},{key:"onContentDestroy",value:function(e){var t=e.content;a(t)&&(t._videoPosterImg&&(t._videoPosterImg.onload=null,t._videoPosterImg.onerror=null,t._videoPosterImg=null),t.element&&(t.player&&"function"==typeof t.player.destroy&&(t.player.destroy(),t.player=null),t.element=null))}},{key:"onContentActivate",value:function(e){var t=e.content;a(t)&&t.player&&"function"==typeof t.player.play&&this.options.playOnActivate&&t.player.play()}},{key:"onContentDeactivate",value:function(e){var t=e.content;a(t)&&t.player&&"function"==typeof t.player.pause&&this.options.stopOnDeactivate&&t.player.pause()}},{key:"onContentAppend",value:function(e){var t=e.content;a(t)&&(e.preventDefault(),"not-appended"===t.status&&(t.status="appended",this.loadVimeoVideo(t)))}},{key:"onContentResize",value:function(e){a(e.content)&&e.preventDefault()}},{key:"isKeepingPlaceholder",value:function(e,t){return!a(t)&&e}},{key:"isContentZoomable",value:function(e,t){return!a(t)&&e}},{key:"useContentPlaceholder",value:function(e,t){return!a(t)&&e}},{key:"playVideo",value:function(e){e.player&&"function"==typeof e.player.play&&e.player.play()}},{key:"pauseVideo",value:function(e){e.player&&"function"==typeof e.player.pause&&e.player.pause()}},{key:"loadVimeoVideo",value:function(e){var t=this,n=document.createElement("div");n.id="pswp-vimeo-player-"+e.index,e.element=n,this.loadVimeoAPI().then((function(){var o=t.extractVimeoVideoId(e.data.videoSrc||e.data.src);if(o)if(e.slide){e.slide.container.appendChild(e.element);var i={id:o,width:e.width,autoplay:!!t.options.vimeoAttributes.autoplay,loop:!!t.options.vimeoAttributes.loop,controls:!!t.options.vimeoAttributes.controls};e.player=new Vimeo.Player(n,i),e.player.ready().then((function(){e.instance.currIndex===e.index&&t.options.playOnActivate&&e.player.play(),e.onLoaded()})).catch((function(t){e.onError()})),t.playerCounter[n.id]=e.player}else e.status="not-appended";else e.onError()}))}},{key:"loadVimeoAPI",value:function(){var e=this;return new Promise((function(t){if(e.vimeoAPIReady)t();else if(e.vimeoAPILoading)e.vimeoAPIReadyCallbacks.push(t);else{e.vimeoAPILoading=!0,e.vimeoAPIReadyCallbacks.push(t);var n=document.createElement("script");n.src="https://player.vimeo.com/api/player.js",n.async=!0,n.onload=function(){e.vimeoAPIReady=!0,e.vimeoAPILoading=!1,e.vimeoAPIReadyCallbacks.forEach((function(e){return e()})),e.vimeoAPIReadyCallbacks=[]},n.onerror=function(){e.vimeoAPILoading=!1,e.vimeoAPIReadyCallbacks=[]};var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o)}}))}},{key:"extractVimeoVideoId",value:function(e){var t=e.match(/vimeo.*(?:\/|clip_id=)([0-9]+)/i);return t&&t[1]?t[1]:null}}],t&&i(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return(t=f(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,f(o.key),o)}}function d(e,t,n){return t&&y(e.prototype,t),n&&y(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function f(e){var t=function(e){if("object"!=c(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=c(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==c(t)?t:t+""}const v=d((function e(t,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),new l(t,u(u({},n),o))}));var m=t.A;export{m as default};