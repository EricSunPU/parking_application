const { ipcRenderer } = require('electron');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('userInfo.db');

ipcRenderer.on('message', (event, message) => {
    console.log(message);
})

var closeBtn = document.getElementById('close');
var createBtn = document.getElementById('createAccountBtn');

createBtn.addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    db.get("SELECT * FROM userinfo WHERE username = ?", username, (err, rows) => {
        console.log(rows);
        if (rows == null) {
            ipcRenderer.send('new-user-registration-success');
            console.log("Account Creation Success!");
            db.run("INSERT INTO userinfo VALUES(?, ?)", [username, password]);
        }
        else {
            ipcRenderer.send('duplicate-username-error');
            console.log("Invalid Username,  Already Exist!");
        }
    })
});

closeBtn.addEventListener('click', function() {
    window.close();
});

