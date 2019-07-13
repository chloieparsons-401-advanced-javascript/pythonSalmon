'use strict';

// Lines 6 - 102 are the factory and its production; lines 103 & onward are when the product ships
// Definitions: Global
var stores = [];
var hoursOpen = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var hoursThead = document.getElementById('Hours_Open');
var tFoot = document.getElementById('Hourly_Total');

function Store_Data(storeName, minHourlyCustomers, maxHourlyCustomers, avgCookiesPerSale) {
  this.store = storeName;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.randCustomersPerHour = 0;
  this.cookiesPurchasedHourly = 0;
  this.cookiesHourlyArray = [];
  this.totalCookies = 0;

  stores.push(this);
}

//Functions performed on the definitions: Cab Do

Store_Data.prototype.getRandCustomersPerHour = function () {
  this.randCustomersPerHour = Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers) + this.minHourlyCustomers);

};

Store_Data.prototype.getCookiesPurchasedHourly = function () {
  for (var i = 0; i < hoursOpen.length; i++) {
    this.cookiesPurchasedHourly = Math.ceil(Math.random() * (this.avgCookiesPerSale * this.randCustomersPerHour));

    this.cookiesHourlyArray.push(this.cookiesPurchasedHourly);
    this.totalCookies += this.cookiesPurchasedHourly;
  }
};

Store_Data.prototype.render = function () {
  var storesData = document.getElementById('tableBody');
  var storesDataTr = document.createElement('tr');
  storesData.appendChild(storesDataTr);

  var storesDataTh = document.createElement('th');
  storesDataTh.textContent = this.store;
  storesDataTr.appendChild(storesDataTh);

  for (var i = 0; i < this.cookiesHourlyArray.length; i++) {
    var storesCookieSales = document.createElement('td');
    storesCookieSales.textContent = this.cookiesHourlyArray[i];
    storesDataTr.appendChild(storesCookieSales);
  }

  var storesTotals = document.createElement('td');
  storesTotals.textContent = this.totalCookies;
  storesDataTr.appendChild(storesTotals);
};

/*
  HELPER FUNCTIONS
*/
function renderAllStoresToDom(){
  for(var i = 0; i < stores.length; i++) {
    stores[i].render();
  }
}

function generateRandomDataAllStores(){
  for(var i = 0; i < stores.length; i++) {
    stores[i].getRandCustomersPerHour();
    stores[i].getCookiesPurchasedHourly();
  }
}

function createInitialData(){
  // I am creating a store called First & Pike and as part of that I am also telling it to put itself in an array: stores
  new Store_Data('First & Pike', 23, 65, 6.3);
  new Store_Data('SeaTac Airport', 3, 24, 1.2);
  new Store_Data('Seattle Center', 11, 38, 3.7);
  new Store_Data('Capitol Hill', 20, 38, 2.3);
  new Store_Data('Alki', 2, 16, 4.6);
}

function createTable(){
  createTableHeader();
  renderAllStoresToDom();
  addTableFooter();
}

function initializePage(){
  createInitialData();
  generateRandomDataAllStores();
  createTable();
}

// 
// HEADER: Hours
function createTableHeader(){
  var hoursTr = document.createElement('tr');
  hoursThead.appendChild(hoursTr);

  var thElH = document.createElement('th');
  hoursTr.appendChild(thElH);

  for (var i = 0; i < hoursOpen.length; i++) {
    var hoursOpenTh = document.createElement('th');
    hoursOpenTh.textContent = hoursOpen[i];
    hoursTr.appendChild(hoursOpenTh);
  }

  var tHead = document.createElement('th');
  tHead.textContent = 'Totals';
  hoursTr.appendChild(tHead);
}

function addTableFooter(){

  var FootTr = document.createElement('tr');
  tFoot.appendChild(FootTr);
  
  var FootTh = document.createElement('th');
  FootTh.textContent = 'Totals';
  FootTr.appendChild(FootTh);

  var allStoresTotalSales = 0;

  for(var i = 0; i < hoursOpen.length; i++){
    var hourlyTotal = 0;

    for(var j = 0; j < stores.length; j++){
      hourlyTotal += stores[j].cookiesHourlyArray[i];
    }

    allStoresTotalSales += hourlyTotal;

    var FootTd = document.createElement('td');
    FootTd.textContent = hourlyTotal;
    FootTr.appendChild(FootTd);
  }

  FootTd = document.createElement('td');
  FootTd.textContent = allStoresTotalSales;
  FootTr.appendChild(FootTd);
}

function removeFooterRow(){
  // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  if(tFoot.firstChild) {
    tFoot.removeChild(tFoot.firstChild);
  }
}

/*
  RUN SCRIPTS
*/
initializePage(); // entry point

/*
  EVENT LISTENERS
*/
function handleSubmit(event){
  event.preventDefault();
  var target = event.target;
  
  // 1. Pull all data off the event object
  var name = target.name.value;
  var minimum = target.minimum.value;
  var maximum = target.maximum.value;
  var average = target.average.value;
  
  // 2. Create a new Store_Data object
  var newStore = new Store_Data(name, minimum, maximum, average);
  newStore.getRandCustomersPerHour();
  newStore.getCookiesPurchasedHourly();

  // Remove footer
  removeFooterRow();

  // Add store
  newStore.render();

  // Add footer
  addTableFooter();

  target.reset();
}

var storeForm = document.getElementById('Store_Input'); //Event Listener added to DOM;
storeForm.addEventListener('submit', handleSubmit); // Event Listener added