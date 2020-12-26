jiant.module("addTodo", function($, app) {

	jiant.onApp(app, function() {
		const view = app.views.header;

		view.newTodoTitleInput.keyup(function(event) {
			if (event.keyCode === jiant.key.enter) {
				const title = $.trim(view.newTodoTitleInput.val());
				if (title.length > 0) {
					view.newTodoTitleInput.val("");
					app.models.todo.jRepo.add({title: title, completed: false});
				}
			}
		});
	});

});
