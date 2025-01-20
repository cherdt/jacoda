// Please forgive me
// It's been many years since I've written much Javascript

function getEl(id) {
    return document.getElementById(id);
}

function createCell(rowIndex) {
    "use strict";
    if (rowIndex == 0) {
        return document.createElement("th");
    }
    return document.createElement("td");
}

function buildData(cell, cellEl) {
    "use strict";
    cellEl.innerHTML = cell;
    return cellEl;
}

function buildRow(row, i) {
    "use strict";
    var tr = document.createElement("tr");
    row.forEach((cell) => tr.appendChild(buildData(cell, createCell(i))));
    return tr;
}
    

function updateJacoda(jacodaData) {
    "use strict";
    var col, row;
    var output = "";
    var table = document.createElement("table");
    jacodaData.forEach((row, i) => table.appendChild(buildRow(row, i)));
    getEl("jacoda").appendChild(table);
}

function buildJsonRow(headers, row){
    var jsonArray = [];
    var item;
    var el = {};
    for (item in headers) {
	el[headers[item]] = row[item];
        jsonArray.push(el)
    }
    return el;
}

function jacoda2json(jacodaData) {
    "use strict";
    var obj = [];
    var row;
    var header = jacodaData[0];
    for (row in jacodaData) {
        if (row==0) continue;
        obj.push(buildJsonRow(header, jacodaData[row]));
    }
    return obj;
}

// Not currently used
function getIncompatibleJacodaError() {
    return [["error"],["JSON input not JACODA-compatible"]];
}

function json2jacoda(jsonData) {
    "use strict";
    var jacodaArray = [];
    var firstLine, line;
    for (var row in jsonData) {
        if (row == 0) {
            firstLine = [];
	    for (var key in jsonData[row]) {
                firstLine.push(key)
	    }
	    jacodaArray.push(firstLine);
	}
	line = [];
        firstLine.forEach((key) => line.push(jsonData[row][key]));
        jacodaArray.push(line);
    }
    return jacodaArray;
}

function updateJson(jsonData) {
    "use strict";
    var row;
    var output = "";
    var tr, td;
    var table = document.createElement("table");
    for (row in jsonData) {
	// Create header on first row
	if (row == 0) {
	    tr = document.createElement("tr");
            for (var key in jsonData[row]) {
                tr.appendChild(buildData(key, createCell(row)));
            }
            table.appendChild(tr); 
	}
	tr = document.createElement("tr");
        for (var key in jsonData[row]) {
            tr.appendChild(buildData(jsonData[row][key], createCell()));
        }
	table.appendChild(tr);
    }
    getEl("json").appendChild(table);
}

function renderingTest(iterations) {

    var starttime, stoptime;
    var jacodaTotalTime = 0;
    var jacodaMeanTime;
    var jsonTotalTime = 0;
    var jsonMeanTime;

    // test JACODA
    for (var i=0; i<iterations; i++) {
	getEl("jacoda").innerHTML = "";
        startTime = Date.now();
	updateJacoda(moviesJacoda);
	stopTime = Date.now();
	jacodaTotalTime += (stopTime - startTime);
    }

    getEl("jacoda_test_count").innerHTML = iterations;
    getEl("jacoda_total_time").innerHTML = jacodaTotalTime;
    getEl("jacoda_mean_time").innerHTML = jacodaTotalTime/iterations;
    
    // test JSON
    for (var i=0; i<iterations; i++) {
	getEl("json").innerHTML = "";
        startTime = Date.now();
	updateJson(moviesJson);
	stopTime = Date.now();
	jsonTotalTime += (stopTime - startTime);
    }
    getEl("json_test_count").innerHTML = iterations;
    getEl("json_total_time").innerHTML = jsonTotalTime;
    getEl("json_mean_time").innerHTML = jsonTotalTime/iterations;
}

if (document.getElementById("jacoda_data")) {
    jacodaData = eval(document.getElementById("jacoda_data").value);
    console.log("JACODA data:");
    console.log(jacodaData);
    console.log("JACODA data converted to JSON:");
    console.log(jacoda2json(jacodaData));
}

if (document.getElementById("json_data")) {
    jsonData = eval(document.getElementById("json_data").value);
    console.log("JSON data:");
    console.log(jsonData);
    console.log("JSON data converted to JACODA:");
    console.log(json2jacoda(jsonData));
}
