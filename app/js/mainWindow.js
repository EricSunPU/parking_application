const { ipcRenderer, dialog} = require('electron');
const { BrowserWindow } = require('electron').remote;
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('parkingInfo.db');
db.run("CREATE TABLE if not exists parkinginfo(spot TEXT NOT NULL, startTime INTEGER, endTime INTEGER, licence TEXT)");

var usernameTag = document.getElementById("username")
var confirmBtn = document.getElementById("confirmBtn")
var checkoutBtn = document.getElementById("checkoutBtn");
var totalHr = document.getElementById("totalHr")
var balance = document.getElementById("balance")
var settings = document.getElementById("settings")
var settingsDiv = document.getElementById("div1");
var A1 = document.getElementById("A1")
var A2 = document.getElementById("A2")
var A3 = document.getElementById("A3")
var A4 = document.getElementById("A4")
var A5 = document.getElementById("A5")
var B1 = document.getElementById("B1")
var B2 = document.getElementById("B2")
var B3 = document.getElementById("B3")
var B4 = document.getElementById("B4")
var B5 = document.getElementById("B5")

var licencePlate;
var membership;
var username
var time1;
var time2;

ipcRenderer.on('username', (event, message) => {
    usernameTag.value = message;
    username = message;
})

ipcRenderer.on('licence', (event, message) => {
    licencePlate = message;
    console.log(message);
})

ipcRenderer.on('membership', (event, message) => {
    membership = message;
    // if (membership == 0) {
    //     settingsDiv.style.display = "none";
    // }
    console.log(membership);
})

settings.addEventListener('click', function() {
    let win = new BrowserWindow({ width: 800, 
        height: 700, 
        frame: false ,  
        webPreferences: {
          nodeIntegration: true
    }})
    const htmlPath = path.join(__dirname, 'settings.html');
    win.on('close', () => {win = null})
    win.loadURL(htmlPath)
    win.show()
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('username', username);
        win.webContents.send('licence', licencePlate);
        win.webContents.send('membership', membership);
    });
})

confirmBtn.addEventListener('click', function() {
    var startingTime = document.getElementById("startingTime").value;
    var endingTime = document.getElementById("endingTime").value;
    time1 = startingTime;
    time2 = endingTime;
    console.log(startingTime)
    console.log(endingTime)
    console.log(endingTime - startingTime);
    
    if (endingTime < startingTime) {
        ipcRenderer.send('time-error');
        return;
    }
    function split(time) {
        var t = time.split(":");
        return t;
    }

    var start = split(startingTime);
    var end = split(endingTime);
    var hr = end[0] - start[0];
    var min = end[1] - start[1];
    if (min > 0) {
        hr++
    }
    totalHr.value = hr;
    balance.value = hr;
})

A1.addEventListener('click', function() {
    var spot = document.getElementById('spot');
    if (spot.value != "A1") {
        spot.value = "A1"
    }
    else {
        spot.value = ""
    }
    A2.checked = false;
    A3.checked = false;
    A4.checked = false;
    A5.checked = false;
    B1.checked = false;
    B2.checked = false;
    B3.checked = false;
    B4.checked = false;
    B5.checked = false;
})

A2.addEventListener('click', function() {
    var spot = document.getElementById('spot');
    if (spot.value != "A2") {
        spot.value = "A2"
    }
    else {
        spot.value = ""
    }
    A1.checked = false;
    A3.checked = false;
    A4.checked = false;
    A5.checked = false;
    B1.checked = false;
    B2.checked = false;
    B3.checked = false;
    B4.checked = false;
    B5.checked = false;
})

A3.addEventListener('click', function() {
    var spot = document.getElementById('spot');
    if (spot.value != "A3") {
        spot.value = "A3"
    }
    else {
        spot.value = ""
    }
    A1.checked = false;
    A2.checked = false;
    A4.checked = false;
    A5.checked = false;
    B1.checked = false;
    B2.checked = false;
    B3.checked = false;
    B4.checked = false;
    B5.checked = false;
})

A4.addEventListener('click', function() {
    var spot = document.getElementById('spot');
    if (spot.value != "A4") {
        spot.value = "A4"
    }
    else {
        spot.value = ""
    }
    A1.checked = false;
    A2.checked = false;
    A3.checked = false;
    A5.checked = false;
    B1.checked = false;
    B2.checked = false;
    B3.checked = false;
    B4.checked = false;
    B5.checked = false;
})

A5.addEventListener('click', function() {
    var spot = document.getElementById('spot');
    if (spot.value != "A5") {
        spot.value = "A5"
    }
    else {
        spot.value = ""
    }
    A1.checked = false;
    A2.checked = false;
    A3.checked = false;
    A4.checked = false;
    B1.checked = false;
    B2.checked = false;
    B3.checked = false;
    B4.checked = false;
    B5.checked = false;
})

B1.addEventListener('click', function() {
    var spot = document.getElementById('spot');
    if (spot.value != "B1") {
        spot.value = "B1"
    }
    else {
        spot.value = ""
    }
    A1.checked = false;
    A2.checked = false;
    A3.checked = false;
    A4.checked = false;
    A5.checked = false;
    B2.checked = false;
    B3.checked = false;
    B4.checked = false;
    B5.checked = false;
})

B2.addEventListener('click', function() {
    var spot = document.getElementById('spot');
    if (spot.value != "B2") {
        spot.value = "B2"
    }
    else {
        spot.value = ""
    }
    A1.checked = false;
    A2.checked = false;
    A3.checked = false;
    A4.checked = false;
    A5.checked = false;
    B1.checked = false;
    B3.checked = false;
    B4.checked = false;
    B5.checked = false;
})

B3.addEventListener('click', function() {
    var spot = document.getElementById('spot');
    if (spot.value != "B3") {
        spot.value = "B3"
    }
    else {
        spot.value = ""
    }
    A1.checked = false;
    A2.checked = false;
    A3.checked = false;
    A4.checked = false;
    A5.checked = false;
    B1.checked = false;
    B2.checked = false;
    B4.checked = false;
    B5.checked = false;
})

B4.addEventListener('click', function() {
    var spot = document.getElementById('spot');
    if (spot.value != "B4") {
        spot.value = "B4"
    }
    else {
        spot.value = ""
    }
    A1.checked = false;
    A2.checked = false;
    A3.checked = false;
    A4.checked = false;
    A5.checked = false;
    B1.checked = false;
    B2.checked = false;
    B3.checked = false;
    B5.checked = false;
})

B5.addEventListener('click', function() {
    var spot = document.getElementById('spot');
    if (spot.value != "B5") {
        spot.value = "B5"
    }
    else {
        spot.value = ""
    }
    A1.checked = false;
    A2.checked = false;
    A3.checked = false;
    A4.checked = false;
    A5.checked = false;
    B1.checked = false;
    B2.checked = false;
    B3.checked = false;
    B4.checked = false;
})

checkoutBtn.addEventListener('click', function () {
    ipcRenderer.send('checkout-success');
    db.run("INSERT INTO parkinginfo VALUES(?, ?, ?, ?)", [spot.value, time1, time2, licencePlate]);
})