'use strict';
const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;
const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('userInfo.db');
db.run("CREATE TABLE if not exists userinfo(username TEXT NOT NULL, password TEXT NOT NULL, accessLevel INTEGER, membership INTEGER, licence TEXT, guestLicence TEXT)");

// For testing 
//db.run("INSERT INTO userinfo VALUES(?, ?, ?, ?, ?, ?)", ["username123", "password", 0, 1, "GPA40", null]);
//db.run("INSERT INTO userinfo VALUES(?, ?, ?, ?, ?, ?)", ["john", "password", 0, 0, null, null]);

var loginBtn = document.getElementById("loginBtn");
var createAccountBtn = document.getElementById("createAccountBtn");

loginBtn.addEventListener('click', function() {
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value; 

    db.get("SELECT * FROM userinfo WHERE username = ?", username, (err, rows) => {
        console.log(rows)
        if (rows == null) {
            ipcRenderer.send('user-not-exist-error');
            console.log("User does not exist!");
            return;
        }
        else if(rows.password != password) {
            ipcRenderer.send('incorrect-password-error');
            console.log("Incorrect Password!");
            return;
        }
        else {
            // Login success
            let win = new BrowserWindow({ width: 800, 
                height: 700, 
                frame: false ,  
                webPreferences: {
                  nodeIntegration: true
            }})
            const htmlPath = path.join(__dirname, 'app/html/main.html');
            win.on('close', () => {win = null})
            win.loadURL(htmlPath)
            win.show()
            win.webContents.on('did-finish-load', () => {
                win.webContents.send('username', username);
                win.webContents.send('licence', rows.licence);
                win.webContents.send('membership', rows.membership);
            });
        }
    })
});

createAccountBtn.addEventListener('click', function() {
    let win = new BrowserWindow({ width: 800, 
                                  height: 600, 
                                  frame: false ,  
                                  webPreferences: {
                                    nodeIntegration: true
                                }})
    const htmlPath = path.join(__dirname, 'app/html/newUser.html');
    win.on('close', () => {win = null})
    win.loadURL(htmlPath)
    win.show()
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('message', 'Hello second window!');
    });
    ipcRenderer.on('newAccountInfo', (event, arg) => {
        console.log(arg);
    })
});