'use strict';

var hrsArray = ['6 a.m.', '7 a.m.', '8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.', '6 p.m.', '7 p.m.'];


// Below is my constructor function
function Salmon(name, minCust, maxCust, avgCookie) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.hourlySales = [];
  this.totalSales = null;
  this.hourlyTotalSales = [];
  this.totalTotalSales = null;
}

var citySeattle = new Salmon('Seattle', 23, 65, 6.3);
var cityTokyo = new Salmon('Tokyo', 3, 24, 1.2);
var cityDubai = new Salmon('Dubai', 11, 38, 3.7);
var cityParis = new Salmon('Paris', 20, 38, 2.3);
var cityLima = new Salmon('Lima', 2, 16, 4.6);

var cityArray = [citySeattle, cityTokyo, cityDubai, cityParis, cityLima];

Salmon.prototype.custEst = function() {
  return Math.random() * (this.maxCust - this.minCust + 1) + this.minCust;
};

Salmon.prototype.salesEst = function() {
  return Math.floor(this.custEst() * this.avgCookie);
};

var salesTable = document.getElementById('sales-table');

function renderHoursRow() {
  var hoursRow = document.createElement('tr');
  var hoursCellFirst = document.createElement('td');
  hoursRow.appendChild(hoursCellFirst);
  for (var h = 0; h < hrsArray.length; h++) {
    var hoursCell = document.createElement('td');
    hoursCell.textContent = hrsArray[h];
    hoursRow.appendChild(hoursCell);
  }
  var hoursCellLast = document.createElement('td');
  hoursCellLast.textContent = 'Total';
  hoursRow.appendChild(hoursCellLast);
  salesTable.appendChild(hoursRow);
}

Salmon.prototype.renderCityRows = function() {
  var salesRow = document.createElement('tr');
  var salesCellFirst = document.createElement('td');
  salesCellFirst.textContent = this.name;
  salesRow.appendChild(salesCellFirst);
  for (var s = 0; s < hrsArray.length; s++) {
    var salesCell = document.createElement('td');
    salesCell.textContent = this.hourlySales[s];
    salesRow.appendChild(salesCell);
  }
  var salesCellTotal = document.createElement('td');
  salesCellTotal.textContent = this.totalSales;
  salesRow.appendChild(salesCellTotal);
  salesTable.appendChild(salesRow);
};

Salmon.prototype.calcHourlySales = function() {
  for (var h = 0; h < hrsArray.length; h++) {
    this.hourlySales.push(this.salesEst());
  }
};

Salmon.prototype.calcTotalSales = function() {
  var sum = 0;
  for (var h = 0; h < hrsArray.length; h++) {
    sum += this.hourlySales[h];
  }
  this.totalSales = sum;
};

Salmon.prototype.hourlyTotalSales = function() {
  var totalsRow = document.createElement('tr');
  var totalsCellFirst = document.createElement('td');
  totalsCellFirst.textContent = 'Totals';
  totalsRow.appendChild(totalsCellFirst);
  for (var t =0; t < hrsArray.length; t++) {
    var totalsCell = document.createElement('td');
    totalsCell.textContent = this.hourlyTotalSales[t];
  }
  var totalsCellTotal = document.createElement('td');
  totalsCellTotal.textContent = this.totalTotalSales;
  totalsRow.appendChild(totalsCellTotal);
  salesTable.appendChild(totalsRow);

};

function renderTotalRow() {
  var footerRow = document.createElement('tr');
  var totalTd = document.createElement('td');
  totalTd.textContent = 'Total';
  footerRow.appendChild(totalTd);
  salesTable.appendChild(footerRow);

  var totalTotalSales = 0;

  for(var i = 0; i < hrsArray.length; i++) {
    var hourlySalesTotal = 0;
    for(var j = 0; j < cityArray.length; j++) {
      hourlySalesTotal = hourlySalesTotal + cityArray[j].hourlySales[i];
    }
    var hourlySalesTotalTd = document.createElement('td');
    hourlySalesTotalTd.textContent = hourlySalesTotal;
    footerRow.appendChild(hourlySalesTotalTd);

    totalTotalSales = totalTotalSales + hourlySalesTotal;
  }
  var totalTotalSalesTd = document.createElement('td');
  totalTotalSalesTd.textContent = totalTotalSales;
  footerRow.appendChild(totalTotalSalesTd);
}

function calcSales() {
  for (var i = 0; i < cityArray.length; i++) {
    cityArray[i].calcHourlySales();
    cityArray[i].calcTotalSales();
  }
}

function renderSalesTable() {
  renderHoursRow();
  for (var i = 0; i < cityArray.length; i++) {
    cityArray[i].renderCityRows();
  }
  renderTotalRow();
}

calcSales();
renderSalesTable();

function handleFormSubmitted(event) {
  event.preventDefault();
  var nameInput = document.getElementById('name');
  var nameValue = nameInput['value'];
  var minCustInput = document.getElementById('minCust');
  var minCustValue = minCustInput['value'];
  var maxCustInput = document.getElementById('maxCust');
  var maxCustValue = maxCustInput['value'];
  var avgCookieInput = document.getElementById('avgCookie');
  var avgCookieValue = avgCookieInput['value'];
  var newSalmon = new Salmon(nameValue, Number(minCustValue), Number(maxCustValue), Number(avgCookieValue));
  cityArray.push(newSalmon);
  // calcSales();
  newSalmon.calcHourlySales();
  newSalmon.calcTotalSales();
  salesTable.innerHTML = '';
  renderSalesTable();
}

var formElement = document.getElementById('new-city');
formElement.addEventListener('submit', handleFormSubmitted);

// Salmon.prototype.calcHourlyTotalSales = function() {
//   var sum =0;
//   for (var h = 0; h < hrsArray.length; h++) {
//     this.hourlyTotalSales.push(
//       sum += this.hourlySales[h]);
//   }
// };

// Salmon.prototype.calcTotalTotalSales = function() {
//   var sum = 0;
//   for (var h = 0; h < hrsArray.length; h++) {
//     sum += this.totalTotalSales[h];
//   }
//   this.totalTotalSales = sum;
//   console.log(sum);
// };

// citySeattle.calcHourlySales();
// citySeattle.calcTotalSales();
// citySeattle.render();
// citySeattle.calcHourlyTotalSales();
// citySeattle.calcTotalTotalSales();

// cityTokyo.calcHourlySales();
// cityTokyo.calcTotalSales();
// cityTokyo.render();

// cityDubai.calcHourlySales();
// cityDubai.calcTotalSales();
// cityDubai.render();

// cityParis.calcHourlySales();
// cityParis.calcTotalSales();
// cityParis.render();

// cityLima.calcHourlySales();
// cityLima.calcTotalSales();
// cityLima.render();

// also add description
// var descriptionCell = document.createElement('td');
// descriptionCell.textContent = this.descriptionWords;
// salmonRow.appendChild(descriptionCell);

// var cityArray = [citySeattle, cityTokyo, cityDubai, cityParis, cityLima];
// var cityHolder = document.getElementById('city-holder');

// cityHolder.textContent = 'Cookie sales estimates by city';
// for (var i = 0; i < cityArray.length; i++) {
//   var newH1 = document.createElement('h1');
//   newH1.textContent = `${cityArray[i].name} sales estimate`;
//   cityHolder.appendChild(newH1);
//   for (var h = 0; h < hrsArray.length; h++) {
//     var newLi = document.createElement('li');
//     newLi.textContent = hrsArray[h] + ': ' + `${cityArray[i].salesEst()}`;
//     cityHolder.appendChild(newLi);
//   }

// var total = function() {
//   sum += numbers[NewLi]};
// cityHolder.appendChild(total);
// }

// var citySeattle = {
//   name: 'Seattle',
//   minCust: 23,
//   maxCust: 65,
//   avgCookie: 6.3,
//   custEst: function () {
//     return Math.random() * (this.maxCust - this.minCust) + this.minCust;
//   },
//   salesEst: function () {
//     return Math.ceil(this.custEst() * this.avgCookie);
//   },
// };
// console.log(citySeattle.salesEst());

// var cityTokyo = {
//   name: 'Tokyo',
//   minCust: 3,
//   maxCust: 24,
//   avgCookie: 1.2,
//   custEst: function () {
//     return Math.random() * (this.maxCust - this.minCust) + this.minCust;
//   },
//   salesEst: function () {
//     return Math.ceil(this.custEst() * this.avgCookie);
//   },
// };
// console.log(cityTokyo.salesEst());

// var cityDubai = {
//   name: 'Dubai',
//   minCust: 11,
//   maxCust: 38,
//   avgCookie: 3.7,
//   custEst: function () {
//     return Math.ceil(Math.random() * (this.maxCust - this.minCust) + this.minCust);
//   },
//   salesEst: function () {
//     return Math.ceil(this.custEst() * this.avgCookie);
//   },
// };
// console.log(cityDubai.salesEst());

// var cityParis = {
//   name: 'Paris',
//   minCust: 20,
//   maxCust: 38,
//   avgCookie: 2.3,
//   custEst: function () {
//     return Math.ceil(Math.random() * (this.maxCust - this.minCust) + this.minCust);
//   },
//   salesEst: function () {
//     return Math.ceil(this.custEst() * this.avgCookie);
//   },
// };
// console.log(cityParis.salesEst());

// var cityLima = {
//   name: 'Lima',
//   minCust: 2,
//   maxCust: 16,
//   avgCookie: 4.6,
//   custEst: function () {
//     return Math.ceil(Math.random() * (this.maxCust - this.minCust) + this.minCust);
//   },
//   salesEst: function () {
//     return Math.ceil(this.custEst() * this.avgCookie);
//   },
// };
// console.log(cityLima.salesEst());



// }
