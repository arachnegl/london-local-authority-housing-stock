(function ($, Backbone, _, app) {

    var HeaderView = Backbone.View.extend({

        tagName: 'header',
        templateName: '#header',

        initialize: function () {
            this.template = _.template($(this.templateName).html());
        },

        render: function () {
            var html = this.template();
            this.$el.html(html);
        }
    });

    var GraphView = Backbone.View.extend({

        templateName: '#local-housing-auth-bars',

        initialize: function () {
            this.template = _.template($(this.templateName).html());
        },

        render: function () {
            var context = this.getContext(),
                html = this.template(context);
            this.$el.html(html);
            this.drawGraph();
        },

        getContext: function () {
            return {};
        },

        drawGraph: function () {

            var result = $.ajax('http://localhost:8000/api/values');
            result.success( function (data) {

                var data = data.values;

                var width = 420,
                    barHeight = 20;

                var x = d3.scale.linear()
                    .domain([0, d3.max(data)])
                    .range([0, width]);

                var chart = d3.select(".chart")
                    .attr("width", width)
                    .attr("height", barHeight * data.length);

                var bar = chart.selectAll("g")
                    .data(data)
                    .enter().append("g")
                    .attr(
                        "transform", 
                        function(d, i) { 
                            return "translate(0," + i * barHeight + ")"; 
                        }
                    );

                bar.append("rect")
                    .attr("width", x)
                    .attr("height", barHeight - 1);

                bar.append("text")
                    .attr("x", function(d) { return x(d) - 3; })
                    .attr("y", barHeight / 2)
                    .attr("dy", ".35em")
                    .text(function(d) { return d; });
            });
        }
    });

    app.views.GraphView = GraphView;
    app.views.HeaderView = HeaderView;

})(jQuery, Backbone, _, app);
