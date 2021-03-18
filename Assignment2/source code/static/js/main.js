var n = 19;

//precomputing the results for task3 as it is time consuming
window.onload = async () => {
    const url = baseUrl + "fetchMDSData"
    let response = await fetch(url)
    mdsData = await response.json()

    const url2 = baseUrl + "kmeansDataPCP"
    let response2 = await fetch(url2)
    kmeansData = await response2.json()
};

/**************************************************************************************************************** */
function getMDSDataEcd(){
    //using the precomputed value of mdsData
    return drawMDSScatter(mdsData, "#mdsplot")
}

async function getMDSDataCrd(){
    const url = baseUrl + "fetchMDSCorrData"
    let response = await fetch(url)
    mdsData = await response.json()
    return drawMDSScatter(mdsData, "#mdscorrplot")
}

async function getPCPData(){
    const url = baseUrl + "fetchPCPData"
    let response = await fetch(url)
    pcpData = await response.json()
    console.log(pcpData)
    return drawPcpPlot(pcpData)
}

async function getScreeDataEigenValue() {
    const url = baseUrl + "fetchscreedataeigenValue"
    let response = await fetch(url)
    eigen = await response.json()
    eigenlist = eigen[0]
    biplot_data_x = eigen[1]
    biplot_data_y = eigen[2]
    for (i=0; i<eigenlist.length; i++) {
        eigen_values.push(eigenlist[i]['eigenvalue']);
        cumulative_values.push(eigenlist[i]['cumulative']);
    }
    return drawBars(eigen_values, eigenlist, "eigenValue")
}

async function getScreeDataExplainedVariance() {
    const url = baseUrl + "fetchscreedataexplainedvariance"
    let response = await fetch(url)
    eigen = await response.json()
    eigenlist = eigen[0]
    biplot_data_x = eigen[1]
    biplot_data_y = eigen[2]
    for (i=0; i<eigenlist.length; i++) {
        eigen_values.push(eigenlist[i]['eigenvalue']);
        cumulative_values.push(eigenlist[i]['cumulative']);
    }
    return drawBars(eigen_values, eigenlist, "explainedVariance")
}

async function gettabledata() {
    document.getElementById("titleDiv").innerHTML = "";
    d3.selectAll('svg').remove()
    const url = baseUrl + "fetchtabledata?dval=" + intrinsic_d
    let response = await fetch(url)
    tableData = await response.json()
    var sortedTable = [];
    for (var item in tableData) {
        sortedTable.push([item, tableData[item]]);
    }

    sortedTable.sort(function(a, b) {
        return a[1] - b[1];
    });
    
    console.log(sortedTable)
    var table_element = document.getElementById('table_body');
    for (var i=sortedTable.length - 1; i>=0; i--) {
        var row = 
        	`<tr style="outline: thin solid">
                <td style="outline: thin solid">${sortedTable[i][0]}</td>
                <td style="outline: thin solid">${sortedTable[i][1]}</td>
             </tr> `
        table_element.innerHTML += row
    }
    document.getElementById("titleDiv").innerHTML = "<h4>Task2.1 - Table Data(4 attributes with highest PCA loadings)</h4>";
}

async function getscatterdata() {
    const url = baseUrl + "fetchscatterdata?dval=" + intrinsic_d
    let response = await fetch(url)
    scatter_d = await response.json()
    scatter_data = scatter_d[0]
    scatter_columns = scatter_d[1]
    return drawScatterMatrix(scatter_data, scatter_columns)
}

/************************************************************************************************************** */
function taskSelectorUpdate(){
    document.getElementById("titleDiv").innerHTML = "";
	var selectedTask = document.getElementById('selectTask').value;
    if(selectedTask=="default"){
        d3.selectAll('svg').remove()
		var task =
		 	`<label>Select Task:</label>
			 <select name="selectedTask" id="selectTask" onchange="return taskSelectorUpdate();">
				<option value="default" selected>default</option>
                <option value="attributes">Attributes</option>
				<option value="task1">Task 1</option>
				<option value="task2">Task 2</option>
                <option value="task3">Task 3</option>
                <option value="task4">Task 4</option>
			</select>
            <div style="width:800px; margin:0 auto;" id="question">
            <p style="text-align:center;">
                <h4 align="center">Task 1: Basic dimension reduction and data visualization with PCA</h4>
                <p align="center">1.1 Compute the Eigenvectors of the data and visualize the
                Eigenvalues as scree plot</p>
                <p align="center">1.2 Add an interaction element on the scree plot to select the intrinsic dimensionality index (di)</p>
                <p align="center">1.3 plot the data into a PCA-based biplot</p>
                
                <h4 align="center">Task 2: Visualize the data with a scatterplot matrix</h4>
                <p align="center">2.1 Use PCA components ≤ di to obtain four attributes with
                highest PCA loadings and list them in a table</p>
                <p align="center">2.2 use these four attributes and construct a scatterplot matrix</p>
                <p align="center">2.3 use k-means to find clusters and color the points by cluster ID</p>
                
                <h4 align="center">Task 3: MDS plots (numerical data dimensions only)</h4>
                <p align="center">3.1 Construct the MDS plot using Euclidian distance and visualize it via a scatterplot</p>
                <p align="center">3.2 Color the points by cluster id</p>
                <p align="center">3.3 Construct the MDS plot using 1-|correlation| distance and visualize it via a scatterplot</p>
                
                <h4 align="center">Task 4: Parallel coordinates plot (PCP)</h4>
                <p align="center">4.1 Visualize the data in a parallel coordinates plot</p>
                <p align="center">4.2 Color the polylines by cluster ID</p>
            </p>
            </div>
            `;
		document.getElementById('taskSelector').innerHTML = task;
	} else if(selectedTask=="attributes"){
        d3.selectAll('svg').remove()
        document.getElementById("question").innerHTML = "";
        var task =
		 	`<label>Select Task:</label>
			<select name="selectedTask" id="selectTask" onchange="return taskSelectorUpdate();">
				<option value="default">default</option>
				<option value="attributes" selected>Attributes</option>
                <option value="task1">Task 1</option>
				<option value="task2">Task 2</option>
                <option value="task3">Task 3</option>
                <option value="task4">Task 4</option>
			</select>
            <br><br><br>
            <h5>
                <li>Number of games played (ngames)</li>
                <li>Number of games won (wgames)</li>
                <li>Adjusted Offensive Efficiency (off_eff)</li>
                <li>Adjusted Defensive Efficiency (def_eff)</li>
                <li>Power Rating (rating)</li>
                <li>Effective Goal Percentage Shot (egps)</li>
                <li>Effective Goal Percentage Allowed (egpa)</li>
                <li>Turnover Percentage Allowed (tpa)</li>
                <li>Turnover Percentage Committed (tpc)</li>
                <li>Offensive Rebound Rate (orr)</li>
                <li>Offensive Rebound Rate Allowed (ora)</li>
                <li>Free Throw Rate (ftr)</li>
                <li>Free Throw Rate Allowed (fta)</li>
                <li>Two Point Shooting Percentage (tps)</li>
                <li>Two Point Shooting Percentage Allowed (tpa)</li>
                <li>Three Point Shooting Percentage (thp)</li>
                <li>Three Point Shooting Percentage Allowed (thpa)</li>
                <li>Adjusted Tempo (at)</li>
                <li>Wins Above Bubble (wab)</li>
            </h5>
            `;
		document.getElementById('taskSelector').innerHTML = task;
    } else if(selectedTask=="task1"){
        d3.selectAll('svg').remove()
		var task = 
			`<label>Select Task:</label>
			<select name="selectedTask" id="selectTask" onchange="return taskSelectorUpdate();">
				<option value="default">default</option>
                <option value="attributes">Attributes</option>
				<option value="taks1" selected>Task 1</option>
				<option value="task2">Task 2</option>
                <option value="task3">Task 3</option>
                <option value="task4">Task 4</option>
			</select>
			<label>Select Sub Task:</label>
			<select name="selectSubTask" id="selectSubTask" onchange="return performSubTask();">
				<option value="defaultSubTask" selected>default</option>
  				<option value="screePlotEigenValues">Task 1.1 - Scree Plot</option>
                <option value="screePlotExplainedVariance">Task 1.2 - Explained Variance</option>
		  		<option value="pcaBiplot">Task 1.3 - PCA Biplot</option>
		  	</select>;
            <div class="intrinsic_d" id="intrinsic_d"></div>`;
		document.getElementById('taskSelector').innerHTML = task;
	} else if(selectedTask=="task2"){
        d3.selectAll('svg').remove()
		var task = 
			`<label>Select Task:</label>
			<select name="selectedTask" id="selectTask" onchange="return taskSelectorUpdate();">
				<option value="default">default</option>
                <option value="attributes">Attributes</option>
				<option value="task1">Task 1</option>
				<option value="task2" selected>Task 2</option>
                <option value="task3">Task 3</option>
                <option value="task4">Task 4</option>
			</select>
			<label>Select Sub Task:</label>
			<select name="selectSubTask" id="selectSubTask" onchange="return performSubTask();">
				<option value="default" selected>default</option>
				<option value="tableData">Task 2.1 - Table Data</option>
				<option value="scatterPlot">Task 2.2 - Scatter Plot Matrix</option>
			</select>
            <div id="changeClusterCount"></div>`;
		document.getElementById('taskSelector').innerHTML = task;
	} else if(selectedTask=="task3"){
        d3.selectAll('svg').remove()
		var task = 
			`<label>Select Task:</label>
			<select name="selectedTask" id="selectTask" onchange="return taskSelectorUpdate();">
				<option value="default">default</option>
                <option value="attributes">Attributes</option>
				<option value="task1">Task 1</option>
				<option value="task2">Task 2</option>
                <option value="task3" selected>Task 3</option>
                <option value="task4">Task 4</option>
			</select>
			<label>Select Sub Task:</label>
			<select name="selectSubTask" id="selectSubTask" onchange="return performSubTask();">
				<option value="default" selected>default</option>
				<option value="mdsPlotEcd">Task 3.1 - MDS plot (Euclidian distance)</option>
				<option value="mdsPlotCrd">Task 3.2/3 - MDS plot (1-|correlation| distance)</option>
			</select>
            <div id="changeClusterCount"></div>`;
		document.getElementById('taskSelector').innerHTML = task;
	} else if(selectedTask=="task4"){
        d3.selectAll('svg').remove()
		var task = 
			`<label>Select Task:</label>
			<select name="selectedTask" id="selectTask" onchange="return taskSelectorUpdate();">
				<option value="default">default</option>
                <option value="attributes">Attributes</option>
				<option value="task1">Task 1</option>
				<option value="task2">Task 2</option>
                <option value="task3">Task 3</option>
                <option value="task4" selected>Task 4</option>
			</select>
			<label>Select Sub Task:</label>
			<select name="selectSubTask" id="selectSubTask" onchange="return performSubTask();">
				<option value="default" selected>default</option>
				<option value="pcpPlot">Task 4.1 - PCP plot</option>
				<option value="polyLines">Task 4.2/3 - Coloring polylines</option>
			</select>
            <div id="changeClusterCount"></div>`;
		document.getElementById('taskSelector').innerHTML = task;
	}
}

function performSubTask(){
    document.getElementById("titleDiv").innerHTML = "";
	var selectedSubTask = document.getElementById("selectSubTask").value;
    document.getElementById("question").innerHTML = "";
    if(selectedSubTask == "screePlotEigenValues"){
        return getScreeDataEigenValue();
	} else if(selectedSubTask == "screePlotExplainedVariance"){
        return getScreeDataExplainedVariance();
	} else if(selectedSubTask == "pcaBiplot"){
		drawBiplot(biplot_data_x,biplot_data_y);
	} else if(selectedSubTask == "tableData"){
        document.getElementById("tablemain").innerHTML = 
            `<div class="tabledata" id="tabledata">
                <h5>4 attributes with highest PCA loadings</h5>
                <table class="table_tag" id="table_tag" style="border: 1px solid;">
                    <thead style="border: 1px solid;">
                        <th>Selected Attribute</th>
                        <th>Sum of Squared Loadings</th>    
                    </thead>
                    <tbody class="table_body" id="table_body">

                    </tbody>
                </table>
        </div>`;
		return gettabledata();
	} else if(selectedSubTask == "scatterPlot"){
        document.getElementById("tablemain").innerHTML = '';
        return getscatterdata();
	} else if(selectedSubTask == "mdsPlotEcd"){
        document.getElementById("tablemain").innerHTML = '';
        return getMDSDataEcd();
    } else if(selectedSubTask == "mdsPlotCrd"){
        document.getElementById("tablemain").innerHTML = '';
        return getMDSDataCrd();
    } else if(selectedSubTask == "pcpPlot"){
        document.getElementById("tablemain").innerHTML = '';
        return getPCPData();
    } else if(selectedSubTask == "polyLines"){
        document.getElementById("tablemain").innerHTML = '';
    }
}
/**************************************************************************************************************** */

function drawBars(data, eigenlist, plotType){
    document.getElementById("titleDiv").innerHTML = "";
    var table = document.getElementById("tabledata");
    if(table){
        document.getElementById("tabledata").innerHTML = "";
    }
    d3.selectAll('svg').remove()

    var margin = {
    	top: 20, 
    	right: 30, 
    	bottom: 50, 
    	left: 50
    },
    width = 800 - margin.left - margin.right, 
    height = 450 - margin.top - margin.bottom;

    var svg = d3.select("#screeplot")  
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xScale = d3.scaleBand()
        .domain(eigenlist.map( d => { return d.factor}))
        .range([0, width])
        .padding(0.4);

    var xLabel;
    var yLabel;
    var yScale;
    
    if(plotType == "explainedVariance"){
        yScale = d3.scaleLinear()
        .domain([0, 100])
        .nice()
        .range([height,0]);
        xLabel = "Component";
        yLabel = "Explained Variance (%)";
    } else if(plotType == "eigenValue"){
        yScale = d3.scaleLinear()
        .domain([0, 9])
        .nice()
        .range([height,0]);
        xLabel = "Component";
        yLabel = "Eigen Value";
    }
    valueline = d3.line()
        .x(d => { return xScale(d.factor) + xScale.bandwidth()/2; })
        .y(d => { return yScale(d.cumulative); });
    
    const xAxis = g.append('g')
        .call(d3.axisBottom(xScale))
        .attr('transform', `translate(0,${height})`);
    
    xAxis.append('text')
        .attr('class', 'bar_x_axis-label')
        .attr('y', 33)
        .attr('x', width / 2)
        .attr('fill', 'black')
        .text(xLabel)
        .style("font-size","18px")
        .attr("font-family","sans-serif");
    
    const yAxis = g.append('g')
        .call(d3.axisLeft(yScale));
    
    yAxis.append('text')
        .attr('class', 'axis-label')
        .attr('y', -30)
        .attr('x', (-height+10)/2)
        .attr('fill', 'black')
        .text(yLabel)
        .attr("transform","rotate(-90)")
        .style("font-size","18px")
        .attr("font-family","sans-serif");
    
    var bars = g.selectAll('.bar')
        .data(eigenlist)
        .enter()
        .append('g')

    bars.append('rect')
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout) 
        .attr("class","bar")
        .attr('x', d => { return xScale(d.factor);})
        .attr('y', d => { return yScale(d.eigenvalue)})
        .attr('width', xScale.bandwidth())
        .attr('height', d => height- yScale(d.eigenvalue))
        .style('fill','steelblue')
    
    var dot = g.selectAll(".dot")
        .data(eigenlist)
        .enter()
        .append('g');
    
    dot.append("circle")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout)
        .on("click", mouseclick)
        .attr("class", "dot")
        .attr("cx", d => { return xScale(d.factor)+xScale.bandwidth()/2;})
        .attr("cy", d => { return yScale(+d.cumulative) })
        .attr("r", 12)
    
    var tooltip = d3.select("#screeplot")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
   
    function mouseover(d) {
        d3.select(this)
            .style('fill','red');  
        
        d3.select(this.parentNode)
            .select('text.bar')
            .style('visibility','visible')
        
        var percentage = d3.select(this.parentNode).datum().cumulative
        
        tooltip
            .html("percentage: " + percentage)
            .style("opacity", 1)
    }

    document.getElementById("titleDiv").innerHTML = "<h4>Task 1.1 - Scree Plot"

    var mousemove = d => { 
        tooltip
            .style("left", (d3.mouse(this)[0] + 90) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    
    function mouseout() {
        d3.select(this).style('fill','steelblue');
        d3.select(this.parentNode).select('text.bar').style('visibility','hidden')
        tooltip
            .style("opacity", 0)
    }
    
    function mouseclick() {
    	intrinsic_d = d3.select(this.parentNode).datum().factor;
        var intrinsic_d_container = 
            `<h5 style="margin-top: 10px;">
                <p class="intrinsic_d_p" id="intrinsic_d_p">
                    You have selected di = ` + intrinsic_d + `
                </p>
            </h5>`;
    	document.getElementById("intrinsic_d").innerHTML = intrinsic_d_container;
        d3.select(this)
            .attr("fill", "red");
    }
    g.exit().remove();
    c_list=[]
}

function drawBiplot(biplot_data_x,biplot_data_y){
    document.getElementById("titleDiv").innerHTML = "";
    var table = document.getElementById("tabledata");
    if(table){
        document.getElementById("tabledata").innerHTML = "";
    }
    d3.selectAll('svg').remove()
    var margin = {
    	top: 10, 
    	right: 30, 
    	bottom: 50, 
    	left: 90
    },
    width = 800 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    var svg = d3.select("#biplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
   
    var x = d3.scaleLinear()
    .domain([-1, 1]).nice()
    .range([ 0, width ])

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(-height));
  
    var y = d3.scaleLinear()
        .domain([-1,1]).nice()
        .range([ height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y).tickSize(-width));

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2 + margin.left)
        .attr("y", height + margin.top + 20)
        .text('PCA1');

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+10)
        .attr("x", -margin.top - height/2 +80)
        .text('PCA2')

    svg.append('g')
        .selectAll("dot")
        .data(biplot_data_x)
        .enter()
        .append("circle")
        .attr("cx", d => { return x(d['pca1']); } )
        .attr("cy", d => { return y(d['pca2']); } )
        .attr("r", 3)
        .style("fill", "green")
    
    
    svg.append('g').selectAll("line")
        .data(biplot_data_y)
        .enter()
        .append("line")
        .attr("class", "square")
        .attr('x1', x(0))
        .attr('y1', y(0))
        .attr("x2", d => { return x(d.pca1_attributes); })
        .attr("y2", d => { return y(d.pca2_attributes); })
        .style("stroke", "steelblue")
    
    document.getElementById("titleDiv").innerHTML = "<h4>Task1.3 - PCA biplot = PCA score plot + Loading plot</h4>";
}

function drawScatterMatrix(scatter_data, scatter_columns){
    document.getElementById("titleDiv").innerHTML = "";
    var table = document.getElementById("tabledata");
    if(table){
        document.getElementById("tabledata").innerHTML = "";
    }
    d3.selectAll('svg').remove()
    var traits = scatter_columns, n = traits.length;
    
    var width = 1000,
        size = (width / n) - 12,
        padding = 24;

    var x = d3.scaleLinear()
        .range([padding / 2, size - padding / 2]);

    var y = d3.scaleLinear()
        .range([size - padding / 2, padding / 2]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(5)
            .tickFormat(d3.format("d"));

    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(5)
            .tickFormat(d3.format("d"));;

    var color = "red";
    var domainByTrait = {};

    traits.forEach(function(trait) {
        domainByTrait[trait] = d3.extent(scatter_data, function(d) { return d[trait]; });
    });

    colors = ["blue","green","yellow","black","grey","gold","darkgreen","pink","brown","slateblue"]
    xAxis.tickSize(size * n);
    yAxis.tickSize(-size * n);

    var svg = d3.select("body").append("svg")
        .attr("width", size * n + padding)
        .attr("height", size * n + padding)
        .append("g")
        .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

    svg.selectAll(".x.axis")
        .data(traits)
        .enter().append("g")
        .attr("class", "x axis")
        .attr("transform", (d, i) => { return "translate(" + (n - i - 1) * size + ",0)"; })
        .each(function(d) {
            x.domain(domainByTrait[d]).nice();
            d3.select(this).call(xAxis);
        });

    svg.selectAll(".y.axis")
        .data(traits)
        .enter().append("g")
        .attr("class", "y axis")
        .attr("transform", (d, i) => { return "translate(0," + i * size + ")"; })
        .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

    var cell = svg.selectAll(".cell")
        .data(cross(traits, traits))
        .enter().append("g")
        .attr("class", "cell")
        .attr("transform", d => { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
        .each(plot);

    cell.filter(d => { return d.i === d.j; }).append("text")
        .attr("x", size/2)
        .attr("y", size/2)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .text(d => { return d.x; });

    function plot(p) {
        var cell = d3.select(this);

    x.domain(domainByTrait[p.x]);
    y.domain(domainByTrait[p.y]);

    cell.append("rect")
        .attr("class", "frame")
        .classed("diagonal", d => { return d.i === d.j; })
        .attr("x", padding / 2)
        .attr("y", padding / 2)
        .attr("width", size - padding)
        .attr("height", size - padding);

    cell.filter(d => {return d.i !== d.j; })
        .selectAll("circle")
        .data(scatter_data)
        .enter().append("circle")
        .attr("cx", d => { return x(d[p.x]); })
        .attr("cy", d => { return y(d[p.y]); })
        .attr("r", 2.5)
        .style("fill", d => { return colors[d.kmeans_label]; });
    }

    document.getElementById("titleDiv").innerHTML = "<h4> Task 2.2 - Scatter Plot Matrix</h4>"
    function cross(a, b) {
    	var c = [], n = a.length, m = b.length, i, j;
    	for (i = -1; ++i < n;)
    		for (j = -1; ++j < m;){
    			c.push({x: a[i], i: i, y: b[j], j: j});
    		}
    		return c;
    }
}

function drawMDSScatter(data, div_tag){
    document.getElementById("titleDiv").innerHTML = "";
    d3.selectAll('svg').remove()
    var margin = {
        top: 10, 
        right: 50, 
        bottom: 40, 
        left: 60
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    colors = ["blue","green","yellow","black","grey","gold","darkgreen", "pink","brown","slateblue"]
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Component1)).nice()
        .range([ 0, width ]);
    
    var xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
    xAxis.append('text')
        .attr('class', 'bar_x_axis-label')
        .attr('y', 33)
        .attr('x', width / 2)
        .attr('fill', 'black')
        .text("MDS Dimension 1")
        .style("font-size","18px")
        .attr("font-family","sans-serif");

    var y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Component2)).nice()
        .range([ height, 0]);
    
    var yAxis = svg.append("g")
        .call(d3.axisLeft(y));    

    yAxis.append('text')
        .attr('class', 'axis-label')
        .attr('y', -30)
        .attr('x', (-height+10)/2)
        .attr('fill', 'black')
        .text("MDS Dimesnion 2")
        .attr("transform","rotate(-90)")
        .style("font-size","18px")
        .attr("font-family","sans-serif");

    var graphTitle = "";
    if (div_tag == "#mdsplot") {
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.Component1); } )
            .attr("cy", function (d) { return y(d.Component2); } )
            .attr("r", 5)
            .style("fill", function(d) { return colors[d.kmeans]; } )
        graphTitle = "<h4>Task3.1 - MDS Plot (Euclidian Distance)</h4>";
    } else if (div_tag=="#mdscorrplot") {
        svg.append('g')
        .attr("stroke", "steelblue")
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.Component1); } )
            .attr("cy", function (d) { return y(d.Component2); } )
            .attr("r", 5)
            .style("fill","steelblue")
        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 15)
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            //.join("text")
            .attr("dy", "0.35em")
            .attr("x", d => x(d.Component1) + 7)
            .attr("y", d => y(d.Component2))
            .text(d => d.name);
        graphTitle = "<h4>Task3.2 - MDS Plot (1 - |correlation| Distance)</h4>";
    }
    document.getElementById("titleDiv").innerHTML = graphTitle;
}

function drawPcpPlot(pcp_data){
    pcp_data = pcp_data.slice(0, 200);
    kmeansData = kmeansData.slice(0, 200);
    d3.selectAll("svg").remove()
    const svgWidth = 1500,
    svgHeight = 600,
    margin = { top: 30, right: 70, bottom: 30, left: 40 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;
    colors = [ "green","yello","red"]

    var x, y = {}, dimensions, dragging = {}, background, foreground;

    var svg = d3.select("body").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    dimensions = d3.keys(pcp_data[0]).filter(function (key) {
        if (key !== "") {
            y[key] = d3.scaleLinear()
                .domain(d3.extent(pcp_data, function (d) { return +d[key]; }))
                .range([height, 0]);
            return key;
        };
    });
    
    x = d3.scalePoint()
        .domain(dimensions)
        .range([0, width]);
    
    background = svg.append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(pcp_data)
        .enter().append("path")
        .attr("d", line)
    
    foreground = svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(pcp_data)
        .enter().append("path")
        .attr("d", line)
        .style("stroke", function(d) { return colors[d.kmeans];})
        .attr("style",function(d,i){
            return "stroke:"+ colors[kmeansData[i]] + ";";
        });
    
    var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
        .call(d3.drag()
            .on("start", function (d) {
                dragging[d] = x(d);
                background.attr("visibility", "hidden");
            })
            .on("drag", function (d) {
                dragging[d] = Math.min(width, Math.max(0, d3.event.x));
                foreground.attr("d", line);
                dimensions.sort(function (a, b) { return position(a) - position(b); });
                x.domain(dimensions);
                g.attr("transform", function (d) { return "translate(" + position(d) + ")"; })
            })
            .on("end", function (d) {
                delete dragging[d];
                transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                transition(foreground).attr("d", line);
                background
                    .attr("d", line)
                    .transition()
                    .delay(500)
                    .duration(0)
                    .attr("visibility", null);
            }));
    
    g.append("g")
        .attr("class", "PCPaxis")
        .each(function (d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("font-size", "12")
        .attr("y", -9)
        .text(function (d) { return d; })
        .attr("fill", "black");
    
    function position(d) {
        var v = dragging[d];
        return v == null ? x(d) : v;
    }
    function transition(g) {
        return g.transition().duration(500);
    }
    
    function line(d) {
        return d3.line()(dimensions.map(function (key) { return [x(key), y[key](d[key])]; }));
    }
}