/*
    var barHeight = 50;
	var width = 600;
	var margin = 10;

    var scale = d3.scaleLinear()
    	 .domain([d3.min(xvals), d3.max(xvals)])
    	 .range([200, 400]);

    var svg = d3.select("#mysvg").append("svg")
         .attr("height", barHeight * xvals.length)
         .attr("width", width);

    var g = svg.selectAll('g')
        .data(xvals)
        .enter()
        .append('g')
        .attr('transform', function(d, i){
            return 'translate(0, ' + i * barHeight + ')';
        });

    g.append('rect')
        .attr('width', function(d){
            return scale(d);
        })
        .attr('height', barHeight - margin)

    g.append("text")
        .attr("x", function (d) { return (scale(d)); })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d) { return d; });
    */