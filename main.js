// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const {ipcMain, dialog} = require('electron')
const path = require('path')

ipcMain.on('time-error', (event) => {
  dialog.showErrorBox('Time Error', 'Invalid Starting Time or Ending Time');
})

ipcMain.on('user-not-exist-error', (event) => {
  dialog.showErrorBox('Authentication Error', 'User Does Not Exist!');
})

ipcMain.on('incorrect-password-error', (event) => {
  dialog.showErrorBox('Authentication Error', 'Invalid Password!');
})

ipcMain.on('reuse-password-error', (event) => {
  dialog.showErrorBox('Error', 'Please Use a New Password!');
})

ipcMain.on('incorrect-double-check-error', (event) => {
  dialog.showErrorBox('Error', 'Password Doesn\'t Match');
})

ipcMain.on('duplicate-username-error', (event) => {
  dialog.showErrorBox('Authentication Error', 'User Already Exist! Please Try Another One.');
})

ipcMain.on('new-user-registration-success', (event) => {
  const options = {
    type: 'info',
    title: 'Registration Success',
    message: "Registration Success! You Can Close This Window Now.",
    buttons: ['OK']
  }
  dialog.showMessageBox(options, (index) => {
    event.sender.send('close-new-user-window', index);
  });
})

ipcMain.on('change-password-success', (event) => {
  const options = {
    type: 'info',
    title: 'Password Update Success',
    message: "Success! You Can Close This Window Now.",
    buttons: ['OK']
  }
  dialog.showMessageBox(options, (index) => {
  });
})

ipcMain.on('checkout-success', (event) => {
  const options = {
    type: 'info',
    title: 'Success',
    message: "Success!",
    buttons: ['OK']
  }
  dialog.showMessageBox(options, (index) => {
  });
})

ipcMain.on('non-consistent-password-error', (event) => {
  dialog.showErrorBox('Authentication Error', 'Password Doesn\'t Match');
})

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})


app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
