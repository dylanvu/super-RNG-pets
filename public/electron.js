const { app, BrowserWindow } = require('electron');
const {ipcMain} = require('electron');
let path = require('path');

ipcMain.on('close', (evt, arg) => {
    app.quit();
});

function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 350,
        height: 575,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            preload: __dirname + '/preload.js'
        },
        autoHideMenuBar: true,
        frame: false,
        // titleBarStyle: 'hidden',
        icon: path.join(__dirname, '/sloth.png')
    })
    // Ensure app is on top
    win.setAlwaysOnTop(true, 'screen')

    // Disable resizing
    win.setResizable(false)

    //load the index.html from a url
    win.loadURL('http://localhost:3000');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.