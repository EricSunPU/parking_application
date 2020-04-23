const { ipcRenderer, dialog} = require('electron');

var confirmBtn = document.getElementById("confirmBtn")
var totalHr = document.getElementById("totalHr")
var balance = document.getElementById("balance")

confirmBtn.addEventListener('click', function() {
    var startingTime = document.getElementById("startingTime").value;
    var endingTime = document.getElementById("endingTime").value;
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
    totalHr.value = hr;
    balance.value = hr;
})