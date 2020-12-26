jiant.module("todoRenderer", function($, app) {

	jiant.onApp(app, function() {

		const tm = app.templates.tmTodo;

		tm.customRenderer = function(todo, todoElem) {
			todo.completed_on(function(td, val) {
				todoElem.toggleStateCtl.prop("checked", todo.completed());
			});
			todoElem.toggleStateCtl.prop("checked", todo.completed());
			todoElem.toggleStateCtl.click(function() {
				todo.completed(! todo.completed());
			});

			todoElem.deleteCtl.click(function() {
				todo.remove();
			});

			todoElem.editCtl.dblclick(function() {
				todo.editing(true);
				todoElem.titleInput.val(todo.title());
				todoElem.titleInput.focus();
			});

			todoElem.titleInput.blur(function() {
				update(todo, todoElem.titleInput, jiant.key.enter);
			});
			todoElem.titleInput.keyup(function(event) {
				update(todo, todoElem.titleInput, event.keyCode);
			});
		};

		function update(todo, input, keyCode) {
			if (keyCode === jiant.key.escape) {
				todo.editing(false);
				input.val(todo.title());
			} else if (keyCode === jiant.key.enter) {
				const newTitle = $.trim(input.val());
				if (newTitle !== "") {
					todo.editing(false);
					todo.title(newTitle);
				} else {
					app.models.todo.remove(todo);
				}
			}
		}

		jiant.xl.bindList(app.models.todo, app.views.main.todoList, app.templates.tmTodo, "ui", null, true)();

	});

});
