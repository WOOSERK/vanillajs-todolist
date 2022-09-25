(function(exports) {
    'use strict';
    function View(template) {
        console.log('view created!');
        this.template = template;

        this.$todoList = document.getElementById('todo-list'); // ul-tag
        this.$newTodo = document.getElementById('new-todo'); // input-tag
    }

    View.prototype.bind = function(event, handler) {
        var self = this;

        if(event === 'newTodo') {
            console.log('View.bind.newTodo execute!');
            var temp = self.$newTodo;
            temp.addEventListener('change', function() {
                handler(self.$newTodo.value);
            });
        }
    }

    View.prototype.render = function(viewCmd, data) {
        var self = this;
        var viewCommands = {
            // data로 넘어오는 값이 storage에 있는 모든 data다. 모든 데이터를 출력하는 역할
            showEntries: function() {
                console.log('View.render.showEntries execute!');
                self._addItem(data);
            },
            // 입력을 마치고 나면 input tag 안을 비워주는 역할
            clearNewTodo: function() {
                console.log('View.render.clearNewTodo execute!');
                self.$newTodo.value = '';
            }
        }

        viewCommands[viewCmd]();
    }

    View.prototype._addItem = function(id) {
        this.$todoList.innerHTML = this.template.insert(id);
    };

    exports.app = exports.app || {};
    exports.app.View = View;
})(this);