(function ($, Backbone, _, app) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'home'
        },

        initialize: function (options) {
            this.contentElement = '#content';
            Backbone.history.start();
        },

        home: function () {
            var view = new app.views.GraphView({
                el: this.contentElement
            });
            view.render();
        }
    
    });

    app.router = AppRouter;

})(jQuery, Backbone, _, app);
