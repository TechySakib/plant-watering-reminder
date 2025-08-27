const { app, BrowserWindow, Tray, Menu, ipcMain, Notification } = require('electron');
const path = require('path');
const fs = require('fs');
const AutoLaunch = require('auto-launch');  // Only include this line once

// Disable hardware acceleration to avoid GPU cache issues
app.disableHardwareAcceleration();

let mainWindow;
let tray = null;
let reminderWindow = null;

// Auto-launch configuration
const plantReminder = new AutoLaunch({
  name: 'Plant Watering Reminder',
  path: path.join(__dirname, 'D:\plant deep\dist\plant-watering-reminder Setup 1.0.0.exe')  // Update this with the correct path to your app's executable
});

plantReminder.enable();  // Enable auto-launch when the computer starts

// Create the main window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    show: false, // Hide the window initially
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // When the window is ready, we can show it
  mainWindow.once('ready-to-show', () => {
    console.log("Window is ready to show.");
    mainWindow.show();
  });

  // Create system tray icon
  tray = new Tray(path.join(__dirname, 'cactus.ico')); // Ensure the icon path is correct
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: () => mainWindow.show() },
    { label: 'Exit', click: () => app.quit() },
  ]);
  tray.setContextMenu(contextMenu);
}

// Create reminder window
function createReminderWindow() {
  if (reminderWindow) return; // Prevent creating multiple reminder windows

  reminderWindow = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false, // No frame to make it a transparent reminder window
    alwaysOnTop: true, // Make sure it's on top
    transparent: true, // Transparent window for the reminder
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  reminderWindow.loadFile(path.join(__dirname, 'reminder.html'));
}

// Initialize settings file if it doesn't exist
function initSettings() {
  const settingsPath = path.join(__dirname, 'data', 'settings.json');
  if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify({
      lastWatered: new Date().toISOString(),
      interval: 3
    }));
  }
}

app.whenReady().then(() => {
  initSettings();
  createMainWindow();

  // Check watering status every hour
  setInterval(checkWateringTime, 3600000); // Check every hour
  checkWateringTime();
});

// Check if it's time to water the plant
function checkWateringTime() {
  const settings = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'settings.json')));
  const lastWatered = new Date(settings.lastWatered);
  const nextWatering = new Date(lastWatered.getTime() + settings.interval * 86400000);

  if (new Date() >= nextWatering && !reminderWindow) {
    createReminderWindow(); // Show the reminder window when it's time
    new Notification({
      title: 'Time to Water the Plant',
      body: "Don't forget to water your plant!"
    }).show();
  }
}

// Handle watering the plant (close reminder and update last watered time)
ipcMain.on('watered-plant', () => {
  const settingsPath = path.join(__dirname, 'data', 'settings.json');
  const settings = JSON.parse(fs.readFileSync(settingsPath));
  settings.lastWatered = new Date().toISOString();
  fs.writeFileSync(settingsPath, JSON.stringify(settings));
  
  if (reminderWindow) {
    reminderWindow.close();
    reminderWindow = null;
  }
});

// Quit app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
