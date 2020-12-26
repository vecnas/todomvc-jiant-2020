jiant.module("states", function($, app) {

	jiant.onApp(app, function() {

		const footer = app.views.footer;

		jiant.xl.nav(app, footer, "Ctl", "selected")();

		app.views.appView.propagate(app.models.env);

		app.states.active.start(function() {
			app.models.env.filterCompleted(false);
		});

		app.states.completed.start(function() {
			app.models.env.filterCompleted(true);
		});

		app.states[""].start(function() {
			app.models.env.filterCompleted(undefined);
		});

	})

});
