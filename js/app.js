'use strict';

var hrs = ['6 a.m.', '7 a.m.', '8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.', '6 p.m.', '7 p.m.'];

function Salmon(name, minCust, maxCust, avgCookie) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.hourlySales = [];
  this.totalSales = null;
}

var citySeattle = new Salmon('Seattle', 23, 65, 6.3);
var cityTokyo = new Salmon('Tokyo', 3, 24, 1.2);
var cityDubai = new Salmon('Dubai', 11, 38, 3.7);
var cityParis = new Salmon('Paris', 20, 38, 2.3);
var cityLima = new Salmon('Lima', 2, 16, 4.6);

Salmon.prototype.custEst = function() {
  return Math.random() * (this.maxCust - this.minCust) + this.minCust;
};

Salmon.prototype.salesEst = function() {
  return Math.ceil(this.custEst() * this.avgCookie);
};

Salmon.prototype.calcHourlySales = function() {
  for (var h = 0; h < hrs.length; h++) {
    this.hourlySales.push(this.salesEst());
  }
};

Salmon.prototype.calcTotalSales = function() {
  var sum = 0;
  for (var h = 0; h < hrs.length; h++) {
    sum += this.hourlySales[h];
  }
  console.log(sum);
};

Salmon.prototype.render = function() {
  var salesTable = document.getElementById('sales-table');

  var hoursRow = document.createElement('tr');
  for (var h = 0; h < hrs.length; h++) {
    var hoursCell = document.createElement('td');
    hoursCell.textContent = hrs[h];
    hoursRow.appendChild(hoursCell);
  }

  var salesRow = document.createElement('tr');
  for (var s = 0; s < hrs.length; s++) {
    var salesCell = document.createElement('td');
    salesCell.textContent = this.hourlySales[s];
    salesRow.appendChild(salesCell);
  }
  salesTable.appendChild(hoursRow);
  salesTable.appendChild(salesRow);
};

citySeattle.calcHourlySales();
citySeattle.render();

cityTokyo.calcHourlySales();
cityTokyo.render();

cityDubai.calcHourlySales();
cityDubai.render();

cityParis.calcHourlySales();
cityParis.render();

cityLima.calcHourlySales();
cityLima.render();

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
//   for (var h = 0; h < hrs.length; h++) {
//     var newLi = document.createElement('li');
//     newLi.textContent = hrs[h] + ': ' + `${cityArray[i].salesEst()}`;
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




// firstDog = {
//   weight: 35,
//   breed: jindo,
//   name: boog,
//   imgUrl: 'https:',
//   descriptionWords: ['hungry', 'blue eyes'],
//   getDescription: function () {
//     return this.descriptionWords[Math.floor(Math.random) * this.descriptionWords.length];
//   }
// };
// firstcat = {
//   weight: 4,
//   breed: calico,
//   name: mew,
//   imgUrl: 'https'
//   descriptionWords: ['small', 'meowy'],
//   getDescription: function () {
//     this.descriptionWords[Math.floor(math.random * this.descriptionWords.lenght)]
//   }
// }
// var pets = [firstDog, firstcat];
// var animalHolder = .getElemnetById('animal-holder');
// animalHolder.textContent = 'the animals Go Here';
// for (var i = 0, i < pets.length; i++){
// var newParagraph = document.createElement('p');
// newParagraph.textContent = 'an adoptable ${pets[i].breed} that is ${pets[i].getDescrition()}';
// animalHolder.appendChild(newParagraph);
// }
