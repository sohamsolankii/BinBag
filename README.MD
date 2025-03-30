### Postman Documentation Link:
[Postman Documentation](https://documenter.getpostman.com/view/34699973/2sB2cPk5Zk)

### Setup the project

 - Download this template from github and open it in your favourite text editor. 
 - Go inside the folder path and execute the following command:
  ```
  npm install
  ```
 - In the root directory create a `.env` file and add the following .env.example variables to .env
    ```
        PORT=<port number of your choice>
    ```
    ex: 
    ```
        PORT=3000
    ```
 - To run the server execute
 ```
 npm run dev
 ```

### API ENDPOINTS

#### Authentication
- **POST** `/api/v1/auth/register` - Register a new user.
- **POST** `/api/v1/auth/login` - Login a user and receive a token.
- **POST** `/api/v1/auth/logout` - Logout the user and clear the token.

#### User Profile
- **GET** `/api/v1/users/profile/:userId` - Get the profile of the logged-in user (requires authentication).
- **PUT** `/api/v1/users/profile/:userId` - Update the profile of the logged-in user (requires authentication).
- **DELETE** `/api/v1/users/profile/:userId` - Delete the profile of the logged-in user (requires authentication).
