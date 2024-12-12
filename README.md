Calendar App

A responsive and interactive Calendar application built with React that allows users to view the calendar, add, edit, and delete events, and navigate between months. Events are stored in local storage to retain user data between sessions.

Features

Interactive Calendar Navigation:

View the current month and year.

Navigate between months using arrow buttons.

Event Management:

Add events with a specific date, time, and description.

Edit existing events.

Delete events.

Events are sorted by date for easy viewing.

Persistent Storage:

Events are saved in local storage to maintain data across browser sessions.

Dynamic Highlights:

Highlights the current day in the calendar.

Tech Stack

Frontend: React.js

Local Storage: Browser's local storage for data persistence

Installation

Clone the repository:

git clone <repository-url>

Navigate to the project directory:

cd calendar-app

Install dependencies:

npm install

Start the development server:

npm start

Open your browser and navigate to:

http://localhost:3000

File Structure

calendar-app/
├── public/
├── src/
│   ├── components/
│   │   └── CalendarApp.js  # Main Calendar Component
│   ├── App.js              # Entry point of the application
│   ├── index.js            # React DOM rendering
│   └── styles.css          # Styling for the app
└── package.json

Usage

Adding an Event

Click on a date in the calendar.

Fill in the event details including time and description.

Click the Add Event button to save the event.

Editing an Event

Locate the event in the event list.

Click the edit icon (✎).

Modify the event details and click Update Event.

Deleting an Event

Locate the event in the event list.

Click the delete icon (🗑) to remove the event.

Navigating Months

Use the left (<) and right (>) arrows to navigate to the previous or next month.
