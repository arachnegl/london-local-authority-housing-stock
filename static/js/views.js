(function ($, Backbone, _, app) {

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

            var data = [
                645588, 635219, 625662, 618621, 593616, 
                573286, 551006, 530015, 515975, 499705, 
                482835, 468318, 456761, 450881, 435542, 
                432937, 403672, 404225, 412822, 410011
            ];

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
        }
    });

    app.views.GraphView = GraphView;

})(jQuery, Backbone, _, app);
