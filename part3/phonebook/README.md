# Phonebook Web Application

This project is a simple phonebook web application built with Node.js, Express.js, and MongoDB. It allows users to store and manage their contacts, including names and phone numbers. The application provides basic CRUD (Create, Read, Update, Delete) functionality for managing contacts.

## Features
- **View Contacts:** Users can view a list of all saved contacts.
- **Add Contact:** Users can add new contacts to the phonebook.
- **Update Contact:** Users can update existing contacts' information.
- **Delete Contact:** Users can delete contacts from the phonebook.
- **Info Page:** Displays basic information about the number of contacts in the phonebook.

## Technologies Used
- **Node.js:** Backend JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing contact information.
- **Mongoose:** MongoDB object modeling tool for Node.js.
- **dotenv:** Library for loading environment variables from a `.env` file.
- **morgan:** HTTP request logger middleware for Node.js.
- **cors:** Cross-Origin Resource Sharing middleware for Express.js.

## Setup Instructions
1. **Clone the repository:** `git clone <repository-url>`
2. **Install dependencies:** `npm install`
3. **Set up environment variables:** Create a `.env` file in the project root directory and add your MongoDB connection URI (`MONGODB_URI`) and server port (`PORT`).
4. **Start the server:** `npm start`
5. **Access the application:** Open your web browser and navigate to `http://localhost:<PORT>`

Feel free to explore and contribute to this project!