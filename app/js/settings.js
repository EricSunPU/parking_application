const { ipcRenderer, dialog} = require('electron');
const { BrowserWindow } = require('electron').remote;
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('userInfo.db');

var usernameTag = document.getElementById("username")
var confirmBtn = document.getElementById("changePasswordConfirm")
var closeBtn = document.getElementById("close")
var changePasswordBtn = document.getElementById("changePassword");
var showPasswordBtn = document.getElementById('show-password');
var joinBtn = document.getElementById("membershipJoin");
var quitBtn = document.getElementById("endMembership");
var addTmpLicenceBtn = document.getElementById("addTmpLicence");
var licenceConfirmBtm = document.getElementById("licenceConfirm");

var licencePlate;
var membership;
var username;

var passwordDiv = document.getElementById("changePasswordDiv");
var joinMembership = document.getElementById("joinMembership");
var forMember = document.getElementById("forMember");
var tmpLicenceDiv = document.getElementById("tmpLicenceDiv");
passwordDiv.style.display = "none";
tmpLicenceDiv.style.display = "none";

ipcRenderer.on('username', (event, message) => {
    username = message;
    usernameTag.value = message;
    console.log(message)
})

ipcRenderer.on('licence', (event, message) => {
    console.log("Hello");
    licencePlate = message;
    console.log(message);
})

ipcRenderer.on('membership', (event, message) => {
    membership = message;
    console.log(membership);
    if(membership == 1) {
        joinMembership.style.display = "none";
    } else {
        forMember.style.display = "none";
    }
})

changePasswordBtn.addEventListener('click', function() {
    if(passwordDiv.style.display === "none") {
        passwordDiv.style.display = "block";
    } else {
        passwordDiv.style.display = "none";
    }
})

confirmBtn.addEventListener('click', function() {
    var oldPassword = document.getElementById("oldPassword");
    var newPassword = document.getElementById("password");
    var newPassword2 = document.getElementById("double-check")

    db.get("SELECT * FROM userinfo WHERE username = ?", username, (err, rows) => {
        console.log(rows);
        if (rows.password != oldPassword.value) {
            ipcRenderer.send('incorrect-password-error');
        }
        else if (rows.password == newPassword.value) {
            ipcRenderer.send('reuse-password-error')
        }
        else if (newPassword.value != newPassword2.value) {
            ipcRenderer.send('incorrect-double-check-error')
        }
        else {
            ipcRenderer.send('change-password-success')
            db.run("Update userinfo SET password=? WHERE username=?", [newPassword.value, username]);
        }
    })
})

joinBtn.addEventListener('click', function() {
    db.run("Update userinfo SET membership=? WHERE username=?", [1, username]);
})

quitBtn.addEventListener('click', function() {
    db.run("Update userinfo SET membership=? WHERE username=?", [0, username]);
})

addTmpLicenceBtn.addEventListener('click', function () {
    if(tmpLicenceDiv.style.display === "none") {
        tmpLicenceDiv.style.display = "block";
    } else {
        tmpLicenceDiv.style.display = "none";
    }
})

licenceConfirmBtm.addEventListener('click', function () {
    var toSet = document.getElementById("tmpLicence").value;
    db.run("Update userinfo SET guestLicence=? WHERE username=?", [toSet, username]);
})

showPasswordBtn.addEventListener('click', function() {
    var oldPassword = document.getElementById('oldPassword');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('double-check');
    if (password.type == "password") {
        oldPassword.type = "text"
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        oldPassword.type = "password";
        password.type = "password";
        confirmPassword.type = "password";
    }
});


closeBtn.addEventListener('click', function() {
    window.close();
});