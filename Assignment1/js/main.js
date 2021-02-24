//global variables for storing csv data
var howOld = [];
var responseTime = [];
var responseRate = [];
var propertyType = [];
var acceptanceRate = [];
var listingCount = [];
var roomType = [];
var accomodates = [];
var minimumNights = [];
var maximumNights = [];
var price = [];
var instantBooking = [];
var bedCount = [];
var avail365Days = [];

// loading data from csv into d3
// http://insideairbnb.com/get-the-data.html
d3.csv("data/clean_data.csv").then(function(csvData) {
	csvData.map( function(d) {
		console.log(+d.host_since);
		howOld.push(+d.host_since);
		responseTime.push(+d.host_response_time);
		responseRate.push(+d.host_response_rate);
		propertyType.push(+d.property_type);
		acceptanceRate.push(+d.host_acceptance_rate);
		listingCount.push(+d.host_listings_count);
		roomType.push(+d.room_type);
		accomodates.push(+d.accommodates);
		minimumNights.push(+d.minimum_nights);
		maximumNights.push(+d.maximum_nights);
		price.push(+d.price);
		instantBooking.push(d.instant_bookable);
		bedCount.push(+d.beds);
		avail365Days.push(+d.availability_365);
	});
});

function fnHome(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnHowOld(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHowOld").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnResponseTime(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnResponseRate(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnAcceptanceRate(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnPropertyType(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnListingCount(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnBedCount(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnRoomType(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnNeighbourhood(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnAccomodates(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnMinimumNights(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnMaximumNights(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnPrice(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnInstantBooking(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}

function fnAvail365Days(){
	document.getElementsByClassName("active")[0].className = "";
    document.getElementById("btnHome").className = "active";
    noOfBins = document.getElementById("slider").value;
    document.getElementById("mysvg").innerHTML = "";
}
