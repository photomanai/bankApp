# BankApp

[Repository Link](https://github.com/photomanai/bankApp)

BankApp is a Node.js application that provides a simple banking system. Users can register, log in, generate virtual cards, manage balances, and transfer funds securely. The app uses MongoDB for data storage, JWT for authentication, and bcrypt for password hashing.

---

## Features

* **User Authentication**

  * Register a new account with FIN, name, surname, phone number, and password.
  * Login with FIN and password.
  * Access token and refresh token authentication using JWT.

* **Card Management**

  * Generate virtual cards with unique card number, CVV, and expiration date.
  * View all cards associated with an account.
  * Add money to a card.
  * Withdraw money from a card.
  * Transfer money between cards.

* **Security**

  * Passwords are securely hashed using bcrypt.
  * JWT tokens are used for authentication.
  * Card uniqueness is enforced.

---

## Technologies

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT (JSON Web Tokens)
* **Password Security:** bcrypt
* **Frontend (optional):** EJS templates for rendering views

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/photomanai/bankApp.git
cd bankApp
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following keys:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret_key
REFRESH_TOKEN=your_refresh_token_secret
```

4. **Run the server**

```bash
npm start
```

The server should now be running at `http://localhost:3000`.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.

---

## License

This project is open-source and available under the MIT License.

---

## Notes

* Ensure MongoDB is running before starting the application.
* Use a secure environment for JWT tokens in production.
