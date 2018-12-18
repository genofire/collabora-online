/* eslint-disable no-alert, no-console */
/* jshint ignore:start*/
!function(e,n){var r={};!function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=e.ERR_CONNECTION_DESTROYED="ConnectionDestroyed",r=e.ERR_CONNECTION_TIMEOUT="ConnectionTimeout",t=e.ERR_NOT_IN_IFRAME="NotInIframe",o={"http:":"80","https:":"443"},a=/^(https?:)?\/\/([^\/:]+)(:(\d+))?/,i={ERR_CONNECTION_DESTROYED:n,ERR_CONNECTION_TIMEOUT:r,ERR_NOT_IN_IFRAME:t,Promise:function(){try{return window?window.Promise:null}catch(e){return null}}(),debug:!1},d=function(){var e=0;return function(){return++e}}(),c=function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];if(i.debug){var t;(t=console).log.apply(t,["[Penpal]"].concat(n))}},u=function(e){var n=document.location,r=a.exec(e),t=void 0,i=void 0,d=void 0;return r?(t=r[1]?r[1]:n.protocol,i=r[2],d=r[4]):(t=n.protocol,i=n.hostname,d=n.port),t+"//"+i+(d&&d!==o[t]?":"+d:"")},s=function(e){var n=[];return e(function(){n.forEach(function(e){e()})}),{then:function(e){n.push(e)}}},l=function(e){return{name:e.name,message:e.message,stack:e.stack}},m=function(e){var n=new Error;return Object.keys(e).forEach(function(r){return n[r]=e[r]}),n},f=function(e,r,t,o){var a=r.localName,u=r.local,s=r.remote,l=r.remoteOrigin,f=!1;c(a+": Connecting call sender");var v=function(e){return function(){for(var r=arguments.length,t=Array(r),o=0;o<r;o++)t[o]=arguments[o];if(c(a+": Sending "+e+"() call"),f){var v=new Error("Unable to send "+e+"() call due to destroyed connection");throw v.code=n,v}return new i.Promise(function(n,r){var o=d(),i=function t(i){if(i.source===s&&i.origin===l&&"reply"===i.data.penpal&&i.data.id===o){c(a+": Received "+e+"() reply"),u.removeEventListener("message",t);var d=i.data.returnValue;i.data.returnValueIsError&&(d=m(d)),("fulfilled"===i.data.resolution?n:r)(d)}};u.addEventListener("message",i),s.postMessage({penpal:"call",id:o,methodName:e,args:t},l)})}};o.then(function(){f=!0}),t.reduce(function(e,n){return e[n]=v(n),e},e)},v=function(e,n,r){var t=e.localName,o=e.local,a=e.remote,d=e.remoteOrigin,u=!1;c(t+": Connecting call receiver");var s=function(e){if(e.source===a&&e.origin===d&&"call"===e.data.penpal){var r=e.data,o=r.methodName,s=r.args,m=r.id;if(c(t+": Received "+o+"() call"),o in n){var f=function(e){return function(n){if(c(t+": Sending "+o+"() reply"),u)return void c(t+": Unable to send "+o+"() reply due to destroyed connection");var r={penpal:"reply",id:m,resolution:e,returnValue:n};"rejected"===e&&n instanceof Error&&(r.returnValue=l(n),r.returnValueIsError=!0);try{a.postMessage(r,d)}catch(e){throw"DataCloneError"===e.name&&a.postMessage({penpal:"reply",id:m,resolution:"rejected",returnValue:l(e),returnValueIsError:!0},d),e}}};new i.Promise(function(e){return e(n[o].apply(n,s))}).then(f("fulfilled"),f("rejected"))}}};o.addEventListener("message",s),r.then(function(){u=!0,o.removeEventListener("message",s)})};i.connectToChild=function(e){var t=e.url,o=e.appendTo,a=e.methods,d=void 0===a?{}:a,l=e.timeout,m=void 0,p=new s(function(e){m=e}),h=window,g=document.createElement("iframe");g.setAttribute('style','display:none;');(o||document.body).appendChild(g),p.then(function(){g.parentNode&&g.parentNode.removeChild(g)});var E=g.contentWindow||g.contentDocument.parentWindow,w=u(t);return{promise:new i.Promise(function(e,o){var a=void 0;void 0!==l&&(a=setTimeout(function(){var e=new Error("Connection to child timed out after "+l+"ms");e.code=r,o(e),m()},l));var i={},u=void 0,y=void 0,N=function(n){if(n.source===E&&n.origin===w&&"handshake"===n.data.penpal){c("Parent: Received handshake, sending reply"),n.source.postMessage({penpal:"handshake-reply",methodNames:Object.keys(d)},n.origin);var r={localName:"Parent",local:h,remote:E,remoteOrigin:n.origin};y&&y();var t=new s(function(e){p.then(e),y=e});v(r,d,t),u&&u.forEach(function(e){delete i[e]}),u=n.data.methodNames,f(i,r,u,p),clearTimeout(a),e(i)}};h.addEventListener("message",N),p.then(function(){h.removeEventListener("message",N);var e=new Error("Connection destroyed");e.code=n,o(e)}),c("Parent: Loading iframe"),g.src=t}),iframe:g,destroy:m}},i.connectToParent=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=e.parentOrigin,a=void 0===o?"*":o,d=e.methods,u=void 0===d?{}:d,l=e.timeout;if(window===window.top){var m=new Error("connectToParent() must be called within an iframe");throw m.code=t,m}var p=void 0,h=new s(function(e){p=e}),g=window,E=g.parent;return{promise:new i.Promise(function(e,t){var o=void 0;void 0!==l&&(o=setTimeout(function(){var e=new Error("Connection to parent timed out after "+l+"ms");e.code=r,t(e),p()},l));var i=function n(r){if(("*"===a||a===r.origin)&&r.source===E&&"handshake-reply"===r.data.penpal){c("Child: Received handshake reply"),g.removeEventListener("message",n);var t={localName:"Child",local:g,remote:E,remoteOrigin:r.origin},i={};v(t,u,h),f(i,t,r.data.methodNames,h),clearTimeout(o),e(i)}};g.addEventListener("message",i),h.then(function(){g.removeEventListener("message",i);var e=new Error("Connection destroyed");e.code=n,t(e)}),c("Child: Sending handshake"),E.postMessage({penpal:"handshake",methodNames:Object.keys(u)},a)}),destroy:p}},e.default=i}(r),"function"==typeof define&&define.amd?define("Penpal",r.default):e.Penpal=r.default}(this);

/**
 * Sets up interaction with Vereign Restful API
 * @param divId - target container to append iframe via Penpal
 * @param methods - list of methods to be used in iframe
 * @param iframeUrl - iframe URL to connect
 * @param apiUrl -  API URL used to access API endpoints
 * @returns {*}
 */
function setupViamAPI(divId, methods, iframeUrl, apiUrl) {
  if (!apiUrl) {
    apiUrl = `${window.location.origin}/api/`;
    console.warn(`API host URL not specified. Fall back to ${apiUrl}`); // eslint-disable-line no-console
  }

  if (!iframeUrl) {
    iframeUrl = `${window.location.origin}/vcl/js/iframe`;
    console.warn(`Iframe URL not specified. Fall back to ${iframeUrl}`); // eslint-disable-line no-console
  }

  const connection = Penpal.connectToChild({
    // URL of page to load into iframe.
    url: iframeUrl,
    // Container to which the iframe should be appended.
    appendTo: document.getElementById(divId),
    // Methods parent is exposing to child
    methods
  });

  return connection.promise
    .then((child) => child.initializeApiHost(apiUrl).then(() => child));
}

window.setupViamAPI = setupViamAPI;
/* jshint ignore:end */
/* eslint-enable no-alert, no-console */
