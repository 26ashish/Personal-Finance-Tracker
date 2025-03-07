# Personal Finance Tracker

## Overview
The Personal Finance Tracker is a full-stack application designed to help users manage their personal finances by tracking income, expenses, and providing insights into their financial health. The application consists of a Node.js/Express backend and a React frontend, organized in separate directories and managed using Docker Compose.

## Project Structure
```
personal-finance-tracker
├── backend
│   ├── src
│   │   ├── index.js
│   │   ├── controllers
│   │   │   └── transactionController.js
│   │   ├── models
│   │   │   └── transactionModel.js
│   │   ├── routes
│   │   │   └── transactionRoutes.js
│   │   └── middleware
│   │       └── logger.js
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   └── TransactionFilter.js
│   │   ├── hooks
│   │   │   └── useTransactions.js
│   │   └── service
│   │       └── api.js
│   ├── public
│   │   └── index.html
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
├── mongo-init.js
├── docker-compose.yml
└── README.md
```

## Installation Instructions

### Prerequisites
- Docker and Docker Compose installed on your machine.

### Setup
1. Clone the repository:
   ```
   git clone <repository-url>
   cd personal-finance-tracker
   ```

2. Build and start the Docker containers:
   ```
   docker-compose up --build
   ```

### Accessing the Application
- The frontend application will be accessible at `http://localhost:3000`.
- The backend API will be accessible at `http://localhost:3002`.

## Design Choices
- **Backend**: The backend is built using Node.js and Express, providing a RESTful API for managing transactions. The application uses a modular structure with separate controllers, models, and routes for better maintainability.
- **Frontend**: The frontend is developed using React, allowing for a dynamic and responsive user interface. React Router is used for navigation between different pages.
- **Database**: The application uses MongoDB for persistent storage of transactions. The MongoDB container is initialized with a script that creates the necessary database and collections.
- **Docker**: Docker is used to containerize both the backend and frontend applications, ensuring consistency across different environments and simplifying deployment.

## Known Limitations
- Currently, the application does not include user authentication. Future improvements may include adding user accounts and secure login functionality.
- The application is designed for demonstration purposes and may require additional features for production use, such as error handling and input validation.

## Future Improvements
- Implement user authentication and authorization.
- Enhance the user interface with additional styling and responsive design elements.