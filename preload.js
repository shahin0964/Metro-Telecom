// Preload script for Electron
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  isElectron: true,
  showNotification: (data) => ipcRenderer.invoke('show-native-notification', data),
  downloadUpdate: (url) => ipcRenderer.invoke('download-update-file', url),
  installUpdate: () => ipcRenderer.invoke('install-and-restart'),
  onDownloadProgress: (callback) => {
    ipcRenderer.on('download-progress', (event, data) => callback(data));
  },
  onNavigateToSettings: (callback) => {
    ipcRenderer.on('navigate-to-settings', () => callback());
  }
});
