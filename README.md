# digital-library
This is a digital library built using React, Nodejs and MongoDB, where users can see list of books and add/edit/delete books.

## Instructions to run the project
### Using Docker
* Build and run the Docker images for backend and frontend using docker-compose.
    ```bash
    docker-compose up
    ```

* To bring the running container down
    ```bash
    docker-compose down
    ```
* The application will start on [http://localhost:3000](http://localhost:3000)

### Without Docker
#### Running Backend
* Create `.env` file with following configs:
    ```
    PORT=5000
    MONGO_URL=<mongodb connection string>
    ```
* Make sure Node v20 is installed and run following command to install dependencies:
    ```
    npm install
    ```
* Run following command to start the server:
    ```
    npm start
    ```
* The backend server will start on [http://localhost:5000](http://localhost:5000)

#### Running Frontend
* Create `.env` file with following configs:
    ```
    PORT=3000
    REACT_APP_SERVER_DOMAIN=<server domain address>
    ```
* Make sure Node v20 is installed and run following command to install dependencies:
    ```
    npm install
    ```
* Run following command to start the server:
    ```
    npm start
    ```
* The frontend application will start on [http://localhost:3000](http://localhost:3000)