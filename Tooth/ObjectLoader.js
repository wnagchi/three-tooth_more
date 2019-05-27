var ObjectLoader = function (manager) {

    this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;

    this.texturePath = '';

}



ObjectLoader.prototype = Object.assign({}, {
    load: function (url, onLoad, onProgress, onError) {

        if (this.texturePath === '') {

            this.texturePath = url.substring(0, url.lastIndexOf('/') + 1);

        }

        var scope = this;

        var loader = new FileLoader(scope.manager);

        loader.load(url, function (text) {

            var json = null;

            try {

                //json = JSON.parse(text);

                json = text;

            } catch (error) {

                if (onError !== undefined) onError(error);

                console.error('THREE:ObjectLoader: Can\'t parse ' + url + '.', error.message);

                return;

            }
            if (onLoad !== undefined) onLoad(text, url)
            return text;

        }, onProgress, onError);

    }


});


//////////////////////////////////////////

/**
 * @author mrdoob / http://mrdoob.com/
 */

function LoadingManager(onLoad, onProgress, onError) {

    var scope = this;

    var isLoading = false;
    var itemsLoaded = 0;
    var itemsTotal = 0;
    var urlModifier = undefined;

    this.onStart = undefined;
    this.onLoad = onLoad;
    this.onProgress = onProgress;
    this.onError = onError;

    this.itemStart = function (url) {

        itemsTotal++;

        if (isLoading === false) {

            if (scope.onStart !== undefined) {

                scope.onStart(url, itemsLoaded, itemsTotal);

            }

        }

        isLoading = true;

    };

    this.itemEnd = function (url) {

        itemsLoaded++;

        if (scope.onProgress !== undefined) {

            scope.onProgress(url, itemsLoaded, itemsTotal);

        }

        if (itemsLoaded === itemsTotal) {

            isLoading = false;

            if (scope.onLoad !== undefined) {

                scope.onLoad();

            }

        }

    };

    this.itemError = function (url) {

        if (scope.onError !== undefined) {

            scope.onError(url);

        }

    };

    this.resolveURL = function (url) {

        if (urlModifier) {

            return urlModifier(url);

        }

        return url;

    };

    this.setURLModifier = function (transform) {

        urlModifier = transform;

    };

}

var DefaultLoadingManager = new LoadingManager();




function FileLoader(manager) {

    this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;

}

Object.assign(FileLoader.prototype, {

    load: function (url, onLoad, onProgress, onError) {

        if (url === undefined) url = '';

        if (this.path !== undefined) url = this.path + url;

        var scope = this;

        var cached = Cache.get(url);

        if (cached !== undefined) {

            scope.manager.itemStart(url);

            setTimeout(function () {

                if (onLoad) onLoad(cached);

                scope.manager.itemEnd(url);

            }, 0);

            return cached;

        }


        // Check for data: URI
        var dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
        var dataUriRegexResult = url.match(dataUriRegex);

        // Safari can not handle Data URIs through XMLHttpRequest so process manually
        if (dataUriRegexResult) {

            var mimeType = dataUriRegexResult[1];
            var isBase64 = !!dataUriRegexResult[2];
            var data = dataUriRegexResult[3];

            data = window.decodeURIComponent(data);

            if (isBase64) data = window.atob(data);

            try {

                var response;
                var responseType = (this.responseType || '').toLowerCase();

                switch (responseType) {

                    case 'arraybuffer':
                    case 'blob':

                        response = new ArrayBuffer(data.length);

                        var view = new Uint8Array(response);

                        for (var i = 0; i < data.length; i++) {

                            view[i] = data.charCodeAt(i);

                        }

                        if (responseType === 'blob') {

                            response = new Blob([response], { type: mimeType });

                        }

                        break;

                    case 'document':

                        var parser = new DOMParser();
                        response = parser.parseFromString(data, mimeType);

                        break;

                    case 'json':

                        response = JSON.parse(data);

                        break;

                    default: // 'text' or other

                        response = data;

                        break;

                }

                // Wait for next browser tick
                window.setTimeout(function () {

                    if (onLoad) onLoad(response);

                    scope.manager.itemEnd(url);

                }, 0);

            } catch (error) {

                // Wait for next browser tick
                window.setTimeout(function () {

                    if (onError) onError(error);

                    scope.manager.itemEnd(url);
                    scope.manager.itemError(url);

                }, 0);

            }

        } else {

            var request = new XMLHttpRequest();
            request.open('GET', url, true);

            request.addEventListener('load', function (event) {

                var response = event.target.response;

                Cache.add(url, response);

                if (this.status === 200) {

                    if (onLoad) onLoad(response);

                    scope.manager.itemEnd(url);

                } else if (this.status === 0) {

                    // Some browsers return HTTP Status 0 when using non-http protocol
                    // e.g. 'file://' or 'data://'. Handle as success.

                    console.warn('THREE.FileLoader: HTTP Status 0 received.');

                    if (onLoad) onLoad(response);

                    scope.manager.itemEnd(url);

                } else {

                    if (onError) onError(event);

                    scope.manager.itemEnd(url);
                    scope.manager.itemError(url);

                }

            }, false);

            if (onProgress !== undefined) {

                request.addEventListener('progress', function (event) {

                    onProgress(event);

                }, false);

            }

            request.addEventListener('error', function (event) {

                if (onError) onError(event);

                scope.manager.itemEnd(url);
                scope.manager.itemError(url);

            }, false);

            if (this.responseType !== undefined) request.responseType = this.responseType;
            if (this.withCredentials !== undefined) request.withCredentials = this.withCredentials;

            if (request.overrideMimeType) request.overrideMimeType(this.mimeType !== undefined ? this.mimeType : 'text/plain');

            for (var header in this.requestHeader) {

                request.setRequestHeader(header, this.requestHeader[header]);

            }

            request.send(null);

        }

        scope.manager.itemStart(url);

        return request;

    },

    setPath: function (value) {

        this.path = value;
        return this;

    },

    setResponseType: function (value) {

        this.responseType = value;
        return this;

    },

    setWithCredentials: function (value) {

        this.withCredentials = value;
        return this;

    },

    setMimeType: function (value) {

        this.mimeType = value;
        return this;

    },

    setRequestHeader: function (value) {

        this.requestHeader = value;
        return this;

    }

});

var Cache = {

    enabled: false,

    files: {},

    add: function (key, file) {

        if (this.enabled === false) return;

        // console.log( 'THREE.Cache', 'Adding key:', key );

        this.files[key] = file;

    },

    get: function (key) {

        if (this.enabled === false) return;

        // console.log( 'THREE.Cache', 'Checking key:', key );

        return this.files[key];

    },

    remove: function (key) {

        delete this.files[key];

    },

    clear: function () {

        this.files = {};

    }

};