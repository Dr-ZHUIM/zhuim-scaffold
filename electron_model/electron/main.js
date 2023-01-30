const {
    app,
    BrowserWindow,
    ipcMain
  } = require('electron')
  const path = require('path');
  const mode = process.argv[2];
  
  const productURL = path.join(__dirname, '../build/index.html');
  
  app.whenReady().then(() => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 2560,
      height: 1600,
      kiosk: true,
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'preloader.js'),
        nodeIntegration: true
      }
    })
  
    // and load the index.html of the app.
    if (mode === 'dev') {
      mainWindow.loadURL("http://localhost:8080/");
      mainWindow.webContents.openDevTools({});
    } else {
      mainWindow.loadFile(productURL)
    }
  
    // Open the DevTools.
    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  
  })
  
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })