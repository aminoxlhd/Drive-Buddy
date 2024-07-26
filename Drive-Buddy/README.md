# Drive Buddy

Drive Buddy is a web application designed to connect car owners who rent their cars for short periods with learners who need to practice their driving skills. The platform provides features for user registration, car booking, feedback, and allows car owners to manage their listings, bookings, and payments.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Registration:** Separate sign-up processes for students and drivers.
- **Car Listings:** Car owners can list their vehicles for rent.
- **Booking System:** Learners can book cars for practice sessions.
- **Feedback:** Users can provide feedback after a rental session.
- **Payment Integration:** Secure payments through PayPal.
- **Authentication:** JWT-based authentication for secure access.
- **Image Thumbnails:** Automatic generation of thumbnails for car images.
- **Responsive Design:** Optimized for various device sizes.

## Technologies Used

### Frontend

- **React** with **Vite**
- **TypeScript**
- **SCSS** for styling
- **Redux** or **Context API** for state management
- **Jest** for testing
- **React Router** for navigation

### Backend

- **Python** with **Flask**
- **MongoDB** for data storage
- **Bull** for background processing
- **Pytest** for testing
- **JWT** for authentication
- **PayPal** for payment integration

### Deployment

- **Vercel** or **Netlify** for frontend
- **Heroku** or **AWS** for backend

## Installation

### Prerequisites

- Node.js
- Python
- MongoDB

### Frontend

1. Clone the repository:
   ```sh
   git clone https://github.com/aminoxlhd/Drive-Buddy.git
   ```
2. Navigate to the frontend directory:
   ```sh
   cd drive-buddy/frontend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:
   ```sh
   cd drive-buddy/backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On MacOS/Linux:
     ```sh
     source venv/bin/activate
     ```
4. Install the dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Start the Flask server:
   ```sh
   flask run
   ```

## Usage

### Frontend

1. Access the frontend application at `http://localhost:5173`.
2. Navigate through the pages to register, login, view car listings, and make bookings.

### Backend

1. The backend server runs at `http://localhost:5000`.
2. Use Postman or a similar tool to interact with the API endpoints.

## API Endpoints

### User Management

- **POST /api/signup/student:** Register a new student.
- **POST /api/signup/driver:** Register a new driver.
- **POST /api/login:** Login a user.

### Car Management

- **GET /api/cars:** Get a list of all cars.
- **POST /api/cars:** Add a new car.
- **GET /api/cars/:id:** Get details of a specific car.
- **PUT /api/cars/:id:** Update car details.
- **DELETE /api/cars/:id:** Delete a car.

### Booking Management

- **POST /api/bookings:** Create a new booking.
- **GET /api/bookings:** Get a list of all bookings.
- **GET /api/bookings/:id:** Get details of a specific booking.
- **PUT /api/bookings/:id:** Update booking details.
- **DELETE /api/bookings/:id:** Cancel a booking.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please contact:

- **Amine Laherod**

  - [aminoxlhd@gmail.com](mailto:aminoxlhd@gmail.com)
  - [LinkedIn](https://www.linkedin.com/in/laheroud-amine/)

- **Aissa Zerrad**
  - [jesus.jesus.core@gmail.com](mailto:jesus.jesus.core@gmail.com)
  - [LinkedIn](https://www.linkedin.com/in/zerrad-aissa)
