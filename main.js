const { app, BrowserWindow, Menu, ipcMain, Notification, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { spawn } = require('child_process');

let mainWindow;
let downloadedInstallerPath = '';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 860,
    minWidth: 980,
    minHeight: 650,
    title: 'Metro Telecom - POS & Inventory System',
    backgroundColor: '#090d16',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// IPC: Show native Windows notification
ipcMain.handle('show-native-notification', (event, { title, body }) => {
  if (Notification.isSupported()) {
    const notif = new Notification({
      title: title || 'Metro Telecom',
      body: body || 'নতুন আপডেট উপলব্ধ রয়েছে।',
      icon: path.join(__dirname, 'icon.png')
    });
    notif.on('click', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
        mainWindow.webContents.send('navigate-to-settings');
      }
    });
    notif.show();
    return true;
  }
  return false;
});

// Helper for https follow redirect
function followRedirectGet(url, onResponse, onError) {
  https.get(url, { headers: { 'User-Agent': 'MetroTelecom-Updater' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      followRedirectGet(res.headers.location, onResponse, onError);
    } else if (res.statusCode === 200) {
      onResponse(res);
    } else {
      onError(new Error(`Server returned status code: ${res.statusCode}`));
    }
  }).on('error', onError);
}

// IPC: Download update installer to temp directory with progress
ipcMain.handle('download-update-file', (event, downloadUrl) => {
  return new Promise((resolve, reject) => {
    const tempDir = app.getPath('temp');
    const targetFile = path.join(tempDir, 'Metro-Telecom-Setup.exe');
    downloadedInstallerPath = targetFile;

    const fileStream = fs.createWriteStream(targetFile);

    followRedirectGet(downloadUrl, (response) => {
      const totalBytes = parseInt(response.headers['content-length'], 10) || (75 * 1024 * 1024);
      let receivedBytes = 0;

      response.on('data', (chunk) => {
        receivedBytes += chunk.length;
        const percent = Math.min(100, Math.round((receivedBytes / totalBytes) * 100));
        event.sender.send('download-progress', {
          percent,
          receivedBytes,
          totalBytes
        });
      });

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          resolve({ success: true, path: targetFile });
        });
      });
    }, (err) => {
      fs.unlink(targetFile, () => {});
      reject(err);
    });
  });
});

// IPC: Execute downloaded installer and quit current app
ipcMain.handle('install-and-restart', () => {
  if (downloadedInstallerPath && fs.existsSync(downloadedInstallerPath)) {
    const child = spawn(downloadedInstallerPath, [], {
      detached: true,
      stdio: 'ignore'
    });
    child.unref();
    app.quit();
    return true;
  }
  return false;
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
