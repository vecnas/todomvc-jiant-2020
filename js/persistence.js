jiant.module("persistence", function($, app) {

	jiant.onApp(app, function() {

		const prefix = "todos-jiant.";

		load();

		function load() {
			const count = localStorage[countKey()];
			let idx = 0;
			if (count) {
				while (idx < count) {
					app.models.todo.jRepo.add({title: localStorage[titleKey(idx)], completed: localStorage[completedKey(idx)] === "true"});
					idx++;
				}
			}
			app.models.todo.on(persist);
		}

		function persist() {
			const todos = app.models.todo.jRepo.all();
			let prevCount = localStorage[countKey()];

			$.each(todos, function(idx, todo) {
				localStorage[titleKey(idx)] = todo.title();
				localStorage[completedKey(idx)] = todo.completed();
			});
			localStorage[countKey()] = todos.length;
			if (prevCount) {
				while (prevCount > todos.length) {
					localStorage.removeItem(titleKey(prevCount - 1));
					localStorage.removeItem(completedKey(prevCount - 1));
					prevCount--;
				}
			}
		}

		function titleKey(idx) {
			return prefix + idx + "title";
		}

		function completedKey(idx) {
			return prefix + idx + "completed";
		}

		function countKey() {
			return prefix + "count";
		}

	});

});
