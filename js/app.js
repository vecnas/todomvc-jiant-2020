(function(jiant) {

	'use strict';

	const collection = jiant.collection,
			container = jiant.container,
			ctl = jiant.ctl,
			cssMarker = jiant.cssMarker,
			cssFlag = jiant.cssFlag,
			input = jiant.input,
			label = jiant.label;

	const app = {

		id: "todoJiantApp",

		appPrefix: "",

		modulesPrefix: "js/",

		modules: ["states", "persistence", "footer", "batch", "addTodo", "todoRenderer"],

		states: {
			"": {},
			active: {},
			completed: {}
		},

		logic: {
			txt: {
				url: "intl.json",
				itemsLeft: function(cnt) {
					return cnt === 1 ? "<strong>1</strong> item left" : ("<strong>" + cnt + "</strong> items left");
				}
			}
		},

		views: {

			appView: {
				// completedCount: cssMarker,
				filterCompleted: cssMarker
			},

			header: {
				newTodoTitleInput: input
			},

			main: {
				batchToggleStateCtl: ctl,
				todoList: container
			},

			footer: {
				activeCount: label,
				clearCompletedCtl: ctl,
				// completedCount: label,

				Ctl: ctl,
				activeCtl: ctl,
				completedCtl: ctl
			}
		},

		templates: {
			tmTodo: {
				completed: cssFlag,
				deleteCtl: ctl,
				editCtl: ctl,
				editing: cssFlag,
				toggleStateCtl: ctl,
				titleInput: input,
				hiddenInEditMode: collection,
				title: label
			}
		},

		models: {
			env: {
				jRepo: {},
				jDefaults: {
					activeCount: 0,
					// completedCount: 0,
				},
				activeCount: function(val) {},
				// completedCount: function(val) {},
				filterCompleted: function(val) {},
			},
			todo: {
				jRepo: {
					listByCompleted: function(val) {},
					countByCompleted: function(val) {return this.listByCompleted(val).length}
				},
				title: function(val) {},
				completed: function(val) {},
				editing: function(val) {},
				ui: function(val) {}
			}
		}

	};

	jiant.bindUi(app);

})(jiant);
