(function ($, Backbone, _, app) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'home'
        },

        initialize: function (options) {
            this.contentElement = '#content';
            this.header = new app.views.HeaderView();
            $('body').prepend(this.header.el);
            this.header.render();
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
