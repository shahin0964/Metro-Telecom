// Preload script for Electron
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  isElectron: true,
  showNotification: (data) => ipcRenderer.invoke('show-native-notification', data),
  openExternal: (url) => ipcRenderer.invoke('open-external-url', url),
  refocusWebContents: () => ipcRenderer.invoke('refocus-web-contents'),
  printPage: (options) => ipcRenderer.invoke('print-page', options),
  printToPDF: (options) => ipcRenderer.invoke('print-to-pdf', options),
  downloadUpdate: (url) => ipcRenderer.invoke('download-update-file', url),
  installUpdate: () => ipcRenderer.invoke('install-and-restart'),
  onDownloadProgress: (callback) => {
    ipcRenderer.on('download-progress', (event, data) => callback(data));
  },
  onNavigateToSettings: (callback) => {
    ipcRenderer.on('navigate-to-settings', () => callback());
  }
});
