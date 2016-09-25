/*global Vue, todoStorage */

var PathData = [
    {
        title: "HTML/CSS",
        url: "http://www.w3school.com.cn/html/index.asp",
        completed: false
    },
    {
        title: "JS",
        url: "http://www.w3school.com.cn/js/index.asp",
        completed: false
    },
    {
        title: "JQ",
        url: "http://www.w3school.com.cn/jquery/index.asp",
        completed: false
    },
    {
        title: "A personal website",
        url: "#",
        completed: false
    }
];

(function (exports) {

	'use strict';

	var filters = {
		all: function (todos) {
			return todos;
		},
		active: function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		completed: function (todos) {
			return todos.filter(function (todo) {
				return todo.completed;
			});
		}
	};

	exports.app = new Vue({

		// the root element that will be compiled
		el: '.todoapp',

		// app initial state
		data: {
			todos: todoStorage.fetch(),
			newTodo: '',
			editedTodo: null,
			visibility: 'all'
		},

        created: function () {
            if(!localStorage.initKey) {
                localStorage.initKey=1;
                todoStorage.save(PathData);
                this.todos=PathData;
            }
        },

		// watch todos change for localStorage persistence
		watch: {
			todos: {
				deep: true,
				handler: todoStorage.save
			}
		},

		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
			filteredTodos: function () {
				return filters[this.visibility](this.todos);
			},
			remaining: function () {
				return filters.active(this.todos).length;
			},
			allDone: {
				get: function () {
					return this.remaining === 0;
				},
				set: function (value) {
					this.todos.forEach(function (todo) {
						todo.completed = value;
					});
				}
			}
		},

		// a custom directive to wait for the DOM to be updated
		// before focusing on the input field.
		// http://vuejs.org/guide/custom-directive.html
		directives: {
			'todo-focus': function (value) {
				if (!value) {
					return;
				}
				var el = this.el;
				Vue.nextTick(function () {
					el.focus();
				});
			}
		}
	});

})(window);
