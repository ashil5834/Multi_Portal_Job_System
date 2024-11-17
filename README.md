# Multi_Portal_Job_System

## Setup Instructions

### Clone the Repository:

git clone <repository-url>

### Install Dependencies:

npm install

### Set Up the Database:

Update the src/config/database.ts and config/config.json file with your SQL Server credentials.

### Create a .env File:

PORT=3000
JWT_SECRET=yourSecretKey
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=1433

### Run Database Migrations:

npx sequelize-cli db:migrate

### Start the Server:

npm run dev

### API Documentation:

http://localhost:8000/api-docs
