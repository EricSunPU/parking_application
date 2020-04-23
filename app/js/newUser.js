const { ipcRenderer } = require('electron');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('userInfo.db');

ipcRenderer.on('message', (event, message) => {
    console.log(message);
})

var closeBtn = document.getElementById('close');
var createBtn = document.getElementById('createAccountBtn');
var showPasswordBtn = document.getElementById('show-password');

createBtn.addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('double-check').value;

    if (password != confirmPassword) {
        ipcRenderer.send('non-consistent-password-error');
        return;
    }

    db.get("SELECT * FROM userinfo WHERE username = ?", username, (err, rows) => {
        console.log(rows);
        if (rows == null) {
            ipcRenderer.send('new-user-registration-success');
            db.run("INSERT INTO userinfo VALUES(?, ?)", [username, password]);
            ipcRenderer.on('close-new-user-window', (event, index) => {
                console.log("Hello");
                window.close();
            })
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

showPasswordBtn.addEventListener('click', function() {
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('double-check');
    if (password.type == "password") {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
    }
});

