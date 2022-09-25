(function(exports) {
    'use strict';
    function Controller(model, view) {
        console.log('controller created!');
        this.model = model;
        this.view = view;
        var self = this;
        // bind를 통해 레코드 변경을 자동적으로 view에 반영한다.
        this.view.bind('newTodo', function(title) {
            self.addItem(title);
        });
        this.showAll();
    }

    Controller.prototype.showAll = function() {
        console.log('Controller.showAll method execute!');
        var self = this;
        this.model.read(function(data) {
            self.view.render('showEntries', data);
        });
    };

    Controller.prototype.addItem = function(title) {
        console.log('Controller.addItem method execute!');
        var self = this;
        if(title.trim() === '') {
            return;
        }

        self.model.create(title, function() {
            self.view.render('clearNewTodo', title);
        });

        this.showAll();
    }

    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);