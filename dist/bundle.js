!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.PhotoSwipeYoutubePlugin=t():e.PhotoSwipeYoutubePlugin=t()}(this,(()=>(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>b});var n={youtubeAttributes:{controls:!1,playsinline:!0,preload:"auto",autoplay:!1,rel:!1},playOnActivate:!0,stopOnDeactivate:!0,preventDragOffset:40};function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,i(o.key),o)}}function i(e){var t=function(e){if("object"!=o(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==o(t)?t:t+""}function a(e){return e&&(e.data&&"youtube"===e.data.type||e.type&&"youtube"===e.type)}const u=function(){return e=function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=n,this.youTubeAPIReady=!1,this.youTubeAPILoading=!1,this.youTubeAPIReadyCallbacks=[],this.playerCounter={},this.initLightboxEvents(t)},t=[{key:"initLightboxEvents",value:function(e){e.on("contentLoad",this.onContentLoad.bind(this)),e.on("contentDestroy",this.onContentDestroy.bind(this)),e.on("contentActivate",this.onContentActivate.bind(this)),e.on("contentDeactivate",this.onContentDeactivate.bind(this)),e.on("contentAppend",this.onContentAppend.bind(this)),e.on("contentResize",this.onContentResize.bind(this)),e.addFilter("isKeepingPlaceholder",this.isKeepingPlaceholder.bind(this)),e.addFilter("isContentZoomable",this.isContentZoomable.bind(this)),e.addFilter("useContentPlaceholder",this.useContentPlaceholder.bind(this)),e.addFilter("domItemData",(function(e,t,n){return a(e)&&(n.dataset.pswpVideoSources?e.videoSources=JSON.parse(n.dataset.pswpVideoSources):n.dataset.pswpVideoSrc?e.videoSrc=n.dataset.pswpVideoSrc:n.getAttribute("href")&&(e.videoSrc=n.getAttribute("href"))),e}))}},{key:"initPswpEvents",value:function(e){var t=this;e.on("pointerDown",(function(n){var o=e.currSlide;if(a(o)&&t.options.preventDragOffset){var r=n.originalEvent;if("pointerdown"===r.type){var i=Math.ceil(o.height*o.currZoomLevel)+o.bounds.center.y,u=r.pageY-e.offset.y;u>i-t.options.preventDragOffset&&u<i&&n.preventDefault()}}})),e.on("appendHeavy",(function(e){a(e.slide)&&!e.slide.isActive&&e.preventDefault()})),e.on("close",(function(){a(e.currSlide.content)&&(e.options.showHideAnimationType&&"zoom"!==e.options.showHideAnimationType||(e.options.showHideAnimationType="fade"),t.pauseVideo(e.currSlide.content))}))}},{key:"onContentLoad",value:function(e){var t=e.content;a(t)&&(e.preventDefault(),"loading"!==t.state&&"loaded"!==t.state&&(t.state="loading",t.type="youtube",this.loadYouTubeVideo(t)))}},{key:"onContentDestroy",value:function(e){var t=e.content;a(t)&&(t._videoPosterImg&&(t._videoPosterImg.onload=null,t._videoPosterImg.onerror=null,t._videoPosterImg=null),t.element&&(t.player&&"function"==typeof t.player.destroy&&(t.player.destroy(),t.player=null),t.element=null))}},{key:"onContentActivate",value:function(e){var t=e.content;a(t)&&t.player&&"function"==typeof t.player.playVideo&&this.options.playOnActivate&&t.player.playVideo()}},{key:"onContentDeactivate",value:function(e){var t=e.content;a(t)&&t.player&&"function"==typeof t.player.pauseVideo&&this.options.stopOnDeactivate&&t.player.pauseVideo()}},{key:"onContentAppend",value:function(e){var t=e.content;a(t)&&(e.preventDefault(),"not-appended"===t.status&&(t.status="appended",this.loadYouTubeVideo(t)))}},{key:"onContentResize",value:function(e){a(e.content)&&(console.log("Resizing Content:",e.content,e.content.index),e.preventDefault(),e.content.element&&(e.content.element.style.width="100%",e.content.element.style.height="100%"))}},{key:"isKeepingPlaceholder",value:function(e,t){return!a(t)&&e}},{key:"isContentZoomable",value:function(e,t){return!a(t)&&e}},{key:"useContentPlaceholder",value:function(e,t){return!a(t)&&e}},{key:"playVideo",value:function(e){e.element&&e.element.play&&e.element.play()}},{key:"pauseVideo",value:function(e){e.element&&e.element.pause&&e.element.pause()}},{key:"loadYouTubeVideo",value:function(e){var t=this;this.loadYouTubeAPI().then((function(){var n=document.createElement("div");n.id="pswp-youtube-player-"+e.index;var o=t.extractYouTubeVideoId(e.data.videoSrc||e.data.src);o?(e.element=n,e.slide?(e.slide.container.appendChild(e.element),e.player=new YT.Player(n.id,{videoId:o,height:e.height,width:e.width,playerVars:{autoplay:t.options.youtubeAttributes.autoplay?1:0,controls:t.options.youtubeAttributes.controls?1:0,rel:t.options.youtubeAttributes.rel?1:0,playsinline:t.options.youtubeAttributes.playsinline?1:0},events:{onReady:function(){e.instance.currIndex===e.index&&t.options.playOnActivate&&e.player.playVideo(),e.onLoaded()},onError:function(t){e.onError()}}}),t.playerCounter[n.id]=e.player):e.status="not-appended"):e.onError()}))}},{key:"loadYouTubeAPI",value:function(){var e=this;return new Promise((function(t){if(e.youTubeAPIReady)t();else if(e.youTubeAPILoading)e.youTubeAPIReadyCallbacks.push(t);else{e.youTubeAPILoading=!0,e.youTubeAPIReadyCallbacks.push(t);var n=document.createElement("script");n.src="https://www.youtube.com/iframe_api",n.async=!0;var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o);var r=e;window.onYouTubeIframeAPIReady=function(){r.youTubeAPIReady=!0,r.youTubeAPILoading=!1,r.youTubeAPIReadyCallbacks.forEach((function(e){return e()})),r.youTubeAPIReadyCallbacks=[]}}}))}},{key:"extractYouTubeVideoId",value:function(e){var t=e.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);return t&&t[1]?t[1]:null}}],t&&r(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return(t=f(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,f(o.key),o)}}function d(e,t,n){return t&&y(e.prototype,t),n&&y(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function f(e){var t=function(e){if("object"!=l(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=l(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==l(t)?t:t+""}const b=d((function e(t,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),new u(t,c(c({},n),o))}));return t})()));