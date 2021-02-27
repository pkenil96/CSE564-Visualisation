/* 
	loading data from csv into d3
 	data source: http://insideairbnb.com/get-the-data.html
*/

d3.csv("data/clean_data.csv").then(function(csvData) {
//d3.csv("data/clean_data.csv").then(function(csvData) {
    csvData.map( function(d) {
		howOld.push(+d.host_since);
		responseTime.push(d.host_response_time);
		responseRate.push(+d.host_response_rate);
		propertyType.push(d.property_type);
		acceptanceRate.push(+d.host_acceptance_rate);
		listingCount.push(+d.host_listings_count);
		roomType.push(d.room_type);
		accomodates.push(+d.accommodates);
		minimumNights.push(+d.minimum_nights);
		maximumNights.push(+d.maximum_nights);
		price.push(+d.price);
		instantBooking.push(d.instant_bookable);
		bedCount.push(+d.beds);
		avail365Days.push(+d.availability_365);
	});
});


var bins = 15;
function fnHome(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    document.getElementById("mysvg").innerHTML = "<h3 align=\"center\">This project analyzes the airbnb data in the city of Amsterdam</h3>";
    return dummy();
}

function fnHowOld(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHowOld").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return histogram(howOld, titleText, xAxisLabelText, yAxisLabelText, bins);
}

function fnResponseTime(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnResponseTime").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return barChart(responseTime, titleText, xAxisLabelText, yAxisLabelText);
}

function fnResponseRate(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnResponseRate").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return histogram(responseRate, titleText, xAxisLabelText, yAxisLabelText, bins);

}

function fnAcceptanceRate(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnAcceptanceRate").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return histogram(acceptanceRate, titleText, xAxisLabelText, yAxisLabelText, bins);
}

function fnPropertyType(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnPropertyType").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = 'What are the types of Airbnb in Amsterdam?'
    var yAxisLabelText = 'Types of Property';
    var xAxisLabelText = 'Frequency';
    return barChart(propertyType, titleText, xAxisLabelText, yAxisLabelText);
}

function fnListingCount(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnListingCount").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return histogram(listingCount, titleText, xAxisLabelText, yAxisLabelText, bins);
}

function fnBedCount(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnBedCount").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return histogram(bedCount, titleText, xAxisLabelText, yAxisLabelText, bins);
}

function fnRoomType(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnRoomType").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = 'What are the types of room in the AirBnb??'
    var yAxisLabelText = 'Types of room';
    var xAxisLabelText = 'Frequency';
    return barChart(roomType, titleText, xAxisLabelText, yAxisLabelText);
}

function fnAccomodates(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnAccomodates").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return histogram(accomodates, titleText, xAxisLabelText, yAxisLabelText, bins);
}

function fnMinimumNights(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnMinimumNights").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    bins = 20;
    return histogram(minimumNights, titleText, xAxisLabelText, yAxisLabelText, bins);
}

function fnMaximumNights(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnMaximumNights").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return histogram(maximumNights, titleText, xAxisLabelText, yAxisLabelText, bins);
}

function fnPrice(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnPrice").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return histogram(price, titleText, xAxisLabelText, yAxisLabelText, bins);
}

function fnInstantBooking(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnInstantBooking").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return barChart(instantBooking, titleText, xAxisLabelText, yAxisLabelText);
}

function fnAvail365Days(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnAvail365Days").className = "active";
    document.getElementById("mysvg").innerHTML = "";
    var titleText = ''
    var yAxisLabelText = '';
    var xAxisLabelText = '';
    return histogram(avail365Days, titleText, xAxisLabelText, yAxisLabelText, bins);
}
