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

function dummy(){
    var data = [1, 1, 2, 5, 16, 3, 4, 2, 16, 9, 1, 9, 9, 5, 4, 1, 1, 16, 7, 7, 3, 5, 16];
    var margin = {
        top: 20, right: 30, bottom: 30, left: 30
    };
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    console.log('width: ' + width);
    console.log('height' + height)
    var max = d3.max(data);
    console.log('max ' + max);
    var min = d3.min(data);
    console.log('min ' + min);
    var x = d3.scaleLinear()
        .domain([min, max])
        .range([0, width]);
    console.log('x ' + x)
    for (var i = 1; i<=16; i++){
        console.log(i + '-->' + x(i));
    }


    var numberofBins = 10;
    var data = d3.histogram()
        .thresholds(x.ticks(numberofBins))
        (data);

}

function histogram(data, titleText, xAxisLabelText, yAxisLabelText, bins){
    
    var formatCount = d3.format(",.0f");

    var margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 30
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var max = d3.max(data);
    var min = d3.min(data);
    // domain takes the range of values and maps it to the new range specified in range
    var x = d3.scaleLinear()
      .domain([min, max])
      .range([0, width]);

    // Generate a histogram using numberofBins uniformly-spaced bins.
    var numberOfBins = bins;

    var data = d3.histogram()
        .thresholds(x.ticks(numberOfBins))
        (data);

    var color = d3.scaleLinear()
        .domain([-1, 0, 1])
        .range(["red", "white", "green"]);

    var yMax = d3.max(data, function(d){return d.length});
    var yMin = d3.min(data, function(d){return d.length});
    
    var colorScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

    var y = d3.scaleLinear()
        .domain([0, yMax])
        .range([height, 0]);

    var xAxis = d3.axisBottom(x).tickFormat(function(d){ 
        return d.x0;
    });

    var svg = d3.select("#mysvg").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
        .data(data)
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", (x(data[0].x1 - data[0].x0) - x(0)) - 1)
        .attr("height", function(d) { return height - y(d.length); })
        .attr("fill", function(d) { return colorScale(d.length) })
        .on("mouseover", function() {
            d3.select(this)
                .attr("fill", "red");
           })
        .on("mouseout", function(d, i) {
            d3.select(this)
                .attr("fill", "black"); 
        });

    bar.append("text")
        .attr("dy", ".40em")
        .attr("y", -12)
        .attr("x", (x(data[0].x1 - data[0].x0) - x(0)) / 2)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatCount(d.length); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
}

function scatterPlot(data, titleText, xAxisLabelText, yAxisLabelText){

}