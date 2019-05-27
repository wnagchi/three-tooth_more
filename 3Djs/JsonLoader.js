var JsonLoader = function (manager) {

    this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;

    this.texturePath = '';

}



JsonLoader.prototype = Object.assign({}, {
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
            if (onLoad !== undefined) onLoad(text)
            return text;

        }, onProgress, onError);

    }


});