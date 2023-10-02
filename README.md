# Elemental - Social network: Individual Project - Make it Real TOP Program v30 💻

Codebase for the node.js projects.

- Built with Node.js, Express and MongoDB (Mongoose).
- REST API.

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/es)
- [Express](https://expressjs.com/)
- [Morgan](https://www.npmjs.com/package/morgan)
- [CORS](https://www.npmjs.com/package/cors)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Cloudinary](https://cloudinary.com/)
- [SendGrid](https://sendgrid.com/)
- [Busboy](https://www.npmjs.com/package/busboy)
- [JSON-webtoken](https://jwt.io/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Express Router and Routes

| Route                        | HTTP Verb | Route middleware         | Description                             |
| -----------------------------| --------- | -------------------------|-----------------------------------------|
| /api/users                   | GET       |                          | Get list of users                       |
| /api/users                   | POST      |                          | Creates a new user                      |
| /api/users/single/:userName  | GET       | isAuthenticated          | Gets a single user                      |
| /api/users/info              | PUT       | isAuthenticated          | Updates user information                |
| /api/users/avatar            | PUT       | isAuthenticated, formData| Updates user avatar                     |
| /api/users/remove-avatar     | DELETE    | isAuthenticated          | Removes user avatar                     |


## Usage
The project includes 50+ functional endpoints. The previous table shows an example with the `/api/users` route. If you need to create an account, explore the app! Here is an example creating a user.

### Example: **user creation**:

Request Body:
```json
{
  "firstName": "Pedro",
  "lastName": "Perez",
  "userName": "pedroperez",
  "email": "pedroperez@example.com",
  "password": "examplepassword123",
}
```

Response:
```json
{ 
  "message": "User created, must verify email"
}
```

Once the user has done the process of activating their account, expect a response:
```json
{
  "message": "Account activated successfully",
  "token": "EXAMPLE_TOKEN.DIOVBQEO189Y491384703189R1BKSCSKJBC",
  "profile": {
    "firstName": "Pedro",
    "lastName": "Perez",
    "userName": "pedroperez",
    "email": "pedroperez@example.com",
    "follows": [],
    "followers": [],
    "likes": [],
  }
}
```

### Developing

1. Run `npm install` to install server dependencies.

2. Configure the `.env` file.

4. Run `npm run dev` to start the development server.