(function ($, Backbone, _, app) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'button',
            'values': 'graph'
        },

        initialize: function (options) {
            this.contentElement = '#content';
            this.current = null;
            this.header = new app.views.HeaderView();
            $('body').prepend(this.header.el);
            this.header.render();
            Backbone.history.start();
        },

        graph: function () {
            var view = new app.views.GraphView({
                el: this.contentElement
            });
            this.render(view);
        },

        button: function () {
            var view = new app.views.ButtonView({
                el: this.contentElement
            });
            this.render(view);
        },

        render: function (view) {
            if (this.current) {
                this.current.$el = $();
                this.current.remove();
            }
            this.current = view;
            this.current.render();
        }
    
    });

    app.router = AppRouter;

})(jQuery, Backbone, _, app);
