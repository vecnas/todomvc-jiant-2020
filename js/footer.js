jiant.module("footer", function($, app) {

	jiant.onApp(app, function() {

		const m = app.models;

		app.views.footer.activeCount.customRenderer = function(env, elem, cnt) {
			elem.html(app.logic.txt.itemsLeft(cnt));
		};

		function updateView() {
			m.todo.jRepo.all().length > 0 ? app.views.footer.show() : app.views.footer.hide();
		}

		m.todo.on(function() {
			m.env.activeCount(m.todo.jRepo.countByCompleted(false));
			// m.env.completedCount(m.todo.jRepo.countByCompleted(true));
			updateView();
			syncVisibility();
		});

		app.views.footer.clearCompletedCtl.click(function() {
			m.todo.jRepo.listByCompleted(true).remove();
		});

		app.views.footer.propagate(m.env, true);

		syncVisibility();

		function syncVisibility() {
			if (m.todo.jRepo.all().length) {
				app.views.footer.show();
				app.views.main.show();
			} else {
				app.views.footer.hide();
				app.views.main.hide();
			}
		}

	});

});
