# **Book-Nest Backend**  
This is the backend for **Book-Nest**, a **virtual bookstore** that enables users to manage their reading journey. The backend is built using **Node.js** and integrates with **Firebase** for authentication and **MongoDB** for data storage.

## **Technologies Used**
- **Node.js**: A JavaScript runtime for building scalable server-side applications.
- **Firebase**: Provides authentication and real-time database capabilities.
- **MongoDB**: A NoSQL database used for storing book data, user information, and reviews.

## **Getting Started**
Follow these steps to set up and run the backend locally:

### 1. Clone the Repository
```bash
git clone https://github.com/Ishita-Sureka/Book-Nest-backend.git
cd Book-Nest-backend
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```
### 3. Environment Variables
Create a `.env` file in the root of the project and add the following environment variables:
```
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
MONGODB_URI=your_mongodb_connection_string
PORT=your_desired_port_number
```
### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
### 5. Access the API
Open your browser or an API testing tool (like Postman) and go to:
```
http://localhost:your_desired_port_number
```
## **Features**
- **User Authentication**: Secure sign-up and login using Firebase Authentication.
- **Book Management**: APIs to add, update, delete, and retrieve book information.
- **User Reviews**: Users can rate and review books they've read.

## **Learn More**
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```


