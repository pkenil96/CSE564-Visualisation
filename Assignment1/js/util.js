const getFrequencyMap = (data) => {
        const map = {};
        data.forEach(item => {
            if(map[item]){
                map[item]++;
            } else {
                map[item] = 1;
            }
        });
        return map;
    };

function barChart(data, titleText, yAxisLabelText, xAxisLabelText){
	var xvals = [];
	var yvals = [];

	let freq_map = getFrequencyMap(data);
	for(let key in freq_map){
		yvals.push(key);
		xvals.push(freq_map[key]);
	}

    myData = [];
    for(let key in freq_map){
        myData.push(
            {
                'name': key,
                'score': freq_map[key]
            }
        );
    }

    const width = 900;
    const height = 500;
    const margin = { top: 50, bottom: 50, left: 50, right: 50 };
    const svg = d3.select('#mysvg')
        .append('svg')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleBand()
        .domain(d3.range(myData.length))
        .range([margin.left, width - margin.right])
        .padding(0.1)

    const y = d3.scaleLinear()
        .domain([d3.min(xvals), d3.max(xvals)])
        .range([height - margin.bottom, margin.top])

    svg.append("g")
        .attr("fill", 'royalblue')
        .selectAll("rect")
        .data(myData)
        //.data(myData.sort((a, b) => d3.descending(a.score, b.score)))
        .join("rect")
          .attr("x", (d, i) => x(i))
          .attr("y", d => y(d.score))
          .attr('title', (d) => d.score)
          .attr("class", "rect")
          .attr("height", d => y(0) - y(d.score))
          .attr("width", x.bandwidth())
          .on("mouseover", function() {
            d3.select(this)
                .attr("fill", "red");
           })
          .on("mouseout", function(d, i) {
            d3.select(this)
                .attr("fill", "royalblue"); 
           });

    function yAxis(g) {
        g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, myData.format))
        .attr("font-size", '20px')
    }

    function xAxis(g) {
        g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => myData[i].name))
        .attr("font-size", '20px')
    }

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
    svg.node();
}


function histogram(hdata, titleText, xAxisLabelText, yAxisLabelText){
    // set the dimensions and margins of the graph
    // set the dimensions and margins of the graph
    
    /*
    var width = 900;
    var height = 500;
    var x = d3.scaleLinear()
        .domain([0, 50])
        .range([0, width]);

    var bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(30))(data);

    var max = d3.max(bins, function(d) {
        return d.y;
    });

    var y = d3.scaleLinear().domain([0, .1]).range([0, height]);

    var yForHistogram = d3.scaleLinear()
        .domain([0, d3.max(bins, function(d) {
        return d.length;
    })])
    .range([height, 0]);

var vis = d3.select("#mysvg")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var bars = vis.selectAll("g.bar")
  .data(bins)
  .enter().append("g")
  .attr("class", "bar")
  .attr("transform", function(d) {
    return "translate(" + x(d.x0) + "," + yForHistogram(d.length) + ")";
  });

bars.append("rect")
  .attr("fill", "steelblue")
  .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
  .attr("height", function(d) {
    return height - yForHistogram(d.length);
  }); */
    var formatCount = d3.format(",.0f");

    var svg = d3.select("#mysvg"),
        margin = {
            top: 10,
            right: 30,
            bottom: 30,
            left: 30
    },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = hdata;
  var values = data.map(function(d) {
    return d
  });
  

  var x = d3.scaleLinear()
    .domain(d3.extent(values))
    .rangeRound([0, width])

  var histogram = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(5));

  var bins = histogram(values);

  var y = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d) {
      return d.length;
    })])
    .range([height, 0]);

  var bar = g.selectAll(".bar")
    .data(bins)
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) {
      return "translate(" + x(d.x0) + "," + y(d.length) + ")";
    });

  bar.append("rect")
    .attr("x", 1)
    .attr("width", x(bins[0].x1) - x(bins[0].x0) - 2)
    .attr("height", function(d) {
      return height - y(d.length);
    });

  bar.append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
    .attr("text-anchor", "middle")
    .text(function(d) {
      return formatCount(d.length);
    });

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

}

function scatterPlot(data, titleText, xAxisLabelText, yAxisLabelText){

}