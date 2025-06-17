# Company API Project
a educational API with Javascript and related technologies (ES6+, mongodb, etc)

# Environment variables

- PORT, the default port is 3000
- MONGODB_URI, the default MONGODB URI
- ADMIN_EMAIL=admin@localhost.local
- ADMIN_USERNAME=admin

# Recommended services

* Heroku
* Mongodb Atlas. Put a username, password and db name
* DigitalOcean

# HR Web Application

A web-based Human Resources Management System built with HTML, JavaScript, and Bootstrap.

## Features

- **Employee Management**
  - View employee list
  - Create new employees
  - Manage personal information
  - Track job history

- **Benefits Administration**
  - Manage benefit plans
  - Track employee benefits enrollment

- **Dashboard**
  - Overview of HR metrics
  - Employee statistics
  - Data visualization

## Tech Stack

- Frontend:
  - HTML5
  - Bootstrap 3
  - jQuery
  - Font Awesome icons
  - DataTables plugin

- Backend:
  - RESTful API endpoints
  - Node.js/Express server running on port 4000

## Project Structure

```
DashBoard/
├── bootstrap/            # Bootstrap framework files
├── css/                 # Custom CSS styles
├── dashboard_css/       # Dashboard-specific styles
├── images/             # Image assets
├── Scripts/            # JavaScript libraries
└── Services/           # API service layer
```

## Getting Started

1. Clone the repository
2. Start the backend server:
```sh
cd SIP_CS
npm install
npm start
```
3. Open `Login.html` in your web browser

## API Endpoints

- `GET http://localhost:4000/api/employee` - Get all employees
- `POST http://localhost:4000/api/employee` - Create new employee

## Contributors

- DaoNguyen - Initial work and maintenance

## License

Copyright © 2014 Admin - DaoNguyen. All rights reserved.