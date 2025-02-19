# 🎉 SubKit

## 🚀 Use Case
Welcome to the SubKit API, your ultimate companion for managing subscriptions like a pro! This API empowers users to effortlessly create, update, delete, and retrieve subscription details while sending automated email reminders for upcoming renewals. Say goodbye to unexpected charges and hello to subscription bliss!

## 🛠 Technologies Used
- **Node.js**: The powerhouse JavaScript runtime that lets you run JavaScript on the server side.
- **Express.js**: A minimalist web framework for Node.js, making it a breeze to build robust web applications.
- **MongoDB**: A flexible NoSQL database that stores data in JSON-like documents, perfect for handling complex data structures.
- **Mongoose**: The elegant ODM (Object Data Modeling) library for MongoDB and Node.js, simplifying data modeling.
- **JWT (JSON Web Tokens)**: A secure way to transmit information between parties, ensuring safe user authentication.
- **Arcjet**: Your security sidekick, providing rate limiting and bot protection to keep your API safe and sound.
- **Upstash**: A serverless platform that automates workflows and sends timely email reminders.
- **NodeMailer**: NodeMailer is a Node.js library that simplifies the process of sending emails from your applications.
- **v0**: Generate email templates bodies and templates, to be used to send reminder emails.

### 🌟 Importance of Technologies
- **Node.js & Express.js**: Build high-performance applications using JavaScript, a language many developers already love.
- **MongoDB**: Enjoy the flexibility and scalability that make it ideal for dynamic data storage and retrieval.
- **JWT**: Securely handle user authentication without the hassle of storing sensitive data on the server.
- **Arcjet & Upstash**: Enhance your API's security and functionality, ensuring a seamless user experience.

## ✨ Unique Features
- **Automated Email Reminders**: Get timely notifications about upcoming subscription renewals, so you never miss a beat.
- **Rate Limiting & Bot Protection**: Keep your API secure from malicious attacks and excessive requests, ensuring reliability and performance.
- **Comprehensive Subscription Management**: Manage all your subscriptions in one place, making it easier to track expenses and make informed decisions.

## 🏗 Instructions to Clone and Run the Project Locally

### ⚡ Prerequisites
- Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
- Set up [MongoDB](https://www.mongodb.com/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud storage.
- Create a [Arcjet](https://arcjet.com) account if you don’t have one.
- Create a [Upstash](https://upstash.com/) account if you don’t have one.
- Use Morgan as a logger to log requests in the terminal
- Generate your `EMAIL_PRODUCT_KEY`  and specify the `Email_Account`, in `.env` file , which *NodeMailer* will use to send reminders.

### 🛠 Step-by-Step Instructions

1. **Clone the Repository**
   Open your terminal and run:
   ```bash
   git clone https://github.com/Debjit316/SubKit.git
   ```

2. **Navigate to the Project Directory**
   Change into the project directory:
   ```bash
   cd SubKit
   ```

3. **Install Dependencies**
   Install the required dependencies with npm:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**
   Create a `.env` file in the root of the project and add:
   ```plaintext
   PORT=5500
   NODE_ENV=<dev/pro>
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ARCJET_KEY=your_arcjet_key
   QSTASH_URL=your_upstash_url
   QSTASH_TOKEN=your_upstash_token
   QSTASH_CURRENT_SIGNING_KEY=your_upstash_current-signing_key
   QSTASH_NEXT_SIGNING_KEY=your_upstash_next-signing_key
   EMAIL_PRODUCT_KEY=your_product_key
   Email_Account=your_account
   ```

5. **Run the Application**
   Start the server using nodemon for automatic restarts:
   ```bash
   npm run dev
   ```

6. **Access the API**
   Open your browser or an API client (like Postman) and navigate to:
   ```
   http://localhost:5500/api/v1
   ```

### 📝 Additional Notes
- Replace placeholders in the `.env` file with your actual configuration values.
- Use tools like Postman or Insomnia or ThunderClient in VSCode to test the API endpoints.
- For detailed instructions on specific features, check out the documentation within the codebase.

Got questions or need help? Don’t hesitate to reach out! Let’s make subscription management a breeze! 🍃
