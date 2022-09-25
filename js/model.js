(function(exports) {
    'use strict';
    function Model(storage) {
        console.log('Model created!');
        this.storage = storage;
    }

    Model.prototype.create = function(title, callback) {
        console.log('Model.create method execute!');
        title = title || '';
        callback = callback || function() {};

        var newItem = {
            title: title.trim(),
            completed: false
        };

        this.storage.save(newItem, callback);
    }

    Model.prototype.read = function(callback) {
        this.storage.findAll(callback);
    }

    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);