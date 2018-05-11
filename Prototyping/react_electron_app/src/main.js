const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const db = require('./db.js');
const auth = require('./Auth.js');

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow;

  function createMainWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createMainWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createMainWindow();
    }
  })

  ipcMain.on('login:submit', (event, arg) => {
    const loginStatus = auth.login(arg);
    if (loginStatus.status == 1) {
      // successful login
      event.sender.send('login:reply', true);
      // connect to the database
      db.connect(arg, (err) => {
        if (err) {
          console.error("connection-error", err);
        } else {
          // connected!
          console.log("**connected to database**");
        }
      });
    } else {
      // failed login
      event.sender.send('login:reply', false);

    }
    // db.connect(arg, (err) => {
    //   if (err) {
    //     console.error("connection-error", err);
    //     // reply with false
    //     event.sender.send('connection:reply', false);
    //   } else {
    //     // reply with true
    //     event.sender.send('connection:reply', true);
    //   }
    // });
  });

ipcMain.on('user:create', (event, arg) => {
  db.createUser(arg);
});

ipcMain.on('user:drop', (event, arg) => {
  db.dropUser(arg);
});

ipcMain.on('user:all', (event, arg) => {
  db.getAllUsers((err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows);
      // event.sender.send('users:all-reply', res.rows);
    }
  });
});

ipcMain.on('database:create', (event, arg) => {
  db.createDatabase(arg);
});

ipcMain.on('database:drop', (event, arg) => {
  db.dropDatabase(arg);
});
