jiant.module("batch", function($, app) {

	jiant.onApp(app, function() {

		const ctl = app.views.main.batchToggleStateCtl,
				m = app.models.todo;

		m.on(updateView);

		function updateView() {
			const total = m.jRepo.all().length,
					completed = m.jRepo.listByCompleted(true).length;
			total > 0 ? ctl.show() : ctl.hide();
			ctl.prop("checked", (total === completed) ? "checked" : null);
		}

		ctl.click(function() {
			m.jRepo.all().completed(ctl.prop("checked"));
		});

	});

});
