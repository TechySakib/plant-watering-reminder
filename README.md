# plant-watering-reminder
Plant Watering Reminder is a desktop application that helps plant owners remember when it's time to water their plants. It allows users to set the last watered date and specify an interval for watering reminders. The application runs in the system tray and sends notifications to remind the user when it's time to water their plant.
### Main Features:
- Set the **last watered date** and **interval** in days.
- Receive **desktop notifications** when it's time to water your plant.
- Minimize the app to the **system tray** for easy access.
- **Auto-launch**: The app automatically starts when the computer reboots.
- Saves settings in a **local JSON file** to persist data across app sessions.

---

## Table of Contents

1. [Installation Instructions](#installation-instructions)
2. [Usage Instructions](#usage-instructions)
3. [Technologies Used](#technologies-used)
4. [Contribution Guidelines](#contribution-guidelines)
5. [Contact Information](#contact-information)
6. [Known Bugs or Issues](#known-bugs-or-issues)
---

## Installation Instructions

Follow the steps below to install and set up the **Plant Watering Reminder** on your local machine.

### Prerequisites:
- **Node.js** (version 12.0.0 or later)
- **npm** (Node package manager)

### Steps to Install:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/plant-watering-reminder.git
2.**Navigate into your project directory**:
  cd plant-watering-reminder
3.**Install the required dependencies**:
  npm install
4.**Run the app in development mode**:
  npm start
5.**To create an installer**:
  npm run dist

This will generate a .exe installer in the dist folder, which you can use to install the app on your computer.
Usage Instructions

Once the app is running, you can:

Set the last watered date and interval (in days).

The app will automatically check the watering status every hour and notify you when it's time to water your plant.

If the watering is done, you can click the reminder window to mark the plant as watered and update the last watered date.

Example:

Last Watered: 2025-08-19

Interval: 3 days

After 3 days, the app will show a reminder that it’s time to water your plant.

Technologies Used

Electron.js: For building the cross-platform desktop application.

Node.js: For file system operations and managing dependencies.

Auto-launch: To enable the app to automatically start when the computer boots up.

JavaScript (HTML/CSS): For creating the front-end of the app.

Node.js File System (fs): For reading and writing settings to a local file.

Contribution Guidelines

We welcome contributions to improve Plant Watering Reminder!

How to Contribute:

Fork the repository.

Create a new branch: git checkout -b new-feature.

Make your changes.

Commit your changes: git commit -m 'Add new feature'.

Push to your forked repository: git push origin new-feature.

Create a pull request.

Coding Standards:

Please follow standard JavaScript conventions.

Ensure that your code is well-commented and that the functionality is clearly defined.
Known Bugs or Issues

Bug: The reminder window may sometimes appear off-screen depending on the user’s screen resolution.

Issue: The interval setting doesn’t automatically adjust for leap years (e.g., February 29th).

Feel free to contribute fixes for these issues!
