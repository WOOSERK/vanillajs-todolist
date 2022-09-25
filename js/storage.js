(function(exports) {
    'use strict';
    function Storage(name, callback) {
        console.log('storage created!');
        callback = callback || function() {};

        this._dbName = name;
        if(!localStorage[name]) {
            var data = {
                todos: []
            };

            localStorage[name] = JSON.stringify(data);
        }
    }

    Storage.prototype.findAll = function(callback) {
        console.log('Storage.findAll method execute!');
        callback = callback || function() {};
        callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
    }

    Storage.prototype.save = function(updateData, callback, id) {
        console.log('Storage.save method execute!');
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        callback = callback || function(){};

        if(id) {
            for(var i=0; i<todos.length; i++) {
                if(todos[i].id === id) {
                    for(var key in updateData) {
                        todos[i][key] = updateData[key];
                    }
                    break;
                }
            }
            localStorage[this._dbName] = JSON.stringify(data);
            callback.call(this, todos);
        } else {
            updateData.id = new Date().getTime();

            todos.push(updateData);
            localStorage[this._dbName] = JSON.stringify(data);
            callback.call(this, [updateData]);
        }
    };

    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);