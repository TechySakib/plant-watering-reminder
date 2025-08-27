const { ipcRenderer } = require('electron');

// Handle "Save" button click
document.getElementById('saveBtn').addEventListener('click', () => {
  const lastWatered = document.getElementById('lastWatered').value;
  const interval = document.getElementById('interval').value;

  const settings = {
    lastWatered: new Date(lastWatered).toISOString(),
    interval: parseInt(interval)
  };

  // Send the settings data to the main process
  ipcRenderer.send('save-settings', settings); // Send data to the main process

  alert('Settings saved!');
});

// Load existing settings when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.once('load-settings', (event, settings) => {
    document.getElementById('lastWatered').value = settings.lastWatered.split('T')[0];
    document.getElementById('interval').value = settings.interval;
  });

  // Request the settings from the main process
  ipcRenderer.send('request-settings');
});
