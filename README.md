# digital-library
This is a digital library built using React, Nodejs and MongoDB, where users can see list of books and add/edit/delete books.

## Instructions to run the project
### Using Docker
#### Development Build
* Build and run the Docker images for backend and frontend using docker-compose.
    ```bash
    docker-compose -f docker-compose.dev.yaml up
    ```
* The application will start on [http://localhost:3000](http://localhost:3000)

* To bring the running container down
    ```bash
    docker-compose -f docker-compose.dev.yaml down
    ```
#### Production Build
* Build and run the Docker images for backend and frontend using docker-compose.
    ```bash
    docker-compose -f docker-compose.prod.yaml up -d
    ```
* The application will start on [http://localhost:8080](http://localhost:8080)

* To bring the running container down
    ```bash
    docker-compose -f docker-compose.prod.yaml down
    ```

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

## Demo
* Visit the app running here: [digital-library](https://digital-library-g2rl.onrender.com/)

**Note:** Since the app is running on the server with free trial, it may get idle. It may take several minutes for the app to be up and running. So, please wait couple mins after visiting the page.