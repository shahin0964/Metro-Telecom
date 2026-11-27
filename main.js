const { app, BrowserWindow, Menu, ipcMain, Notification, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { spawn } = require('child_process');

// Disable hardware acceleration to eliminate Windows GPU compositor input hit-testing glitches
app.disableHardwareAcceleration();

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
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      spellcheck: false
    }
  });

  // Completely remove native Windows menu bar so Alt or Alt+Shift (Bangla keyboard switch) never steals focus
  mainWindow.removeMenu();
  Menu.setApplicationMenu(null);

  // In-window developer and navigation shortcuts without native menu interception
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // F12 or Ctrl+Shift+I: toggle DevTools
    if (input.key === 'F12' || (input.control && input.shift && input.key.toLowerCase() === 'i')) {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }
    // F5 or Ctrl+R: reload app
    if (input.key === 'F5' || (input.control && input.key.toLowerCase() === 'r')) {
      mainWindow.reload();
      event.preventDefault();
    }
    // F11: toggle fullscreen
    if (input.key === 'F11') {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
      event.preventDefault();
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.focus();
  });

  mainWindow.on('focus', () => {
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.focus();
    }
  });

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

// IPC: Open external web URL in default browser
ipcMain.handle('open-external-url', (event, url) => {
  if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
    shell.openExternal(url);
    return true;
  }
  return false;
});

// IPC: Refocus native window and web contents if focus desyncs
ipcMain.handle('refocus-web-contents', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
  if (win) {
    win.focus();
    win.webContents.focus();
    return true;
  }
  return false;
});

// IPC: Native System Print (Bypasses unsupported Chromium web preview dialog)
ipcMain.handle('print-page', async (event, options = {}) => {
  const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
  if (!win) return { success: false, error: 'No active window' };

  return new Promise((resolve) => {
    win.webContents.print(
      {
        silent: options.silent || false,
        printBackground: true,
        color: true,
        deviceName: options.deviceName || '',
        pageSize: options.pageSize || 'A4',
        margins: {
          marginType: 'default'
        }
      },
      (success, failureReason) => {
        if (!success) {
          console.warn('Native print cancelled or failed:', failureReason);
          resolve({ success: false, reason: failureReason });
        } else {
          resolve({ success: true });
        }
      }
    );
  });
});

// IPC: Native Print to PDF (Direct file export)
ipcMain.handle('print-to-pdf', async (event, options = {}) => {
  const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
  if (!win) return { success: false, error: 'No active window' };

  try {
    const pdfData = await win.webContents.printToPDF({
      printBackground: true,
      pageSize: options.pageSize || 'A4'
    });

    const defaultFilename = options.filename || `Metro-Telecom-Memo-${Date.now()}.pdf`;
    const { filePath, canceled } = await dialog.showSaveDialog(win, {
      title: 'ক্যাশ মেমো / রিপোর্ট PDF হিসেবে সেভ করুন',
      defaultPath: path.join(app.getPath('documents'), defaultFilename),
      filters: [{ name: 'PDF Documents (*.pdf)', extensions: ['pdf'] }]
    });

    if (!canceled && filePath) {
      await fs.promises.writeFile(filePath, pdfData);
      return { success: true, filePath };
    }
    return { success: false, canceled: true };
  } catch (err) {
    console.error('PrintToPDF failed:', err);
    return { success: false, error: err.message };
  }
});

// IPC: Execute downloaded installer and quit current app
ipcMain.handle('install-and-restart', async () => {
  if (downloadedInstallerPath && fs.existsSync(downloadedInstallerPath)) {
    try {
      await shell.openPath(downloadedInstallerPath);
      setTimeout(() => app.quit(), 600);
      return true;
    } catch (err) {
      console.error('shell.openPath failed, falling back to spawn:', err);
      const child = spawn(downloadedInstallerPath, [], {
        detached: true,
        shell: true,
        stdio: 'ignore'
      });
      child.unref();
      setTimeout(() => app.quit(), 600);
      return true;
    }
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
