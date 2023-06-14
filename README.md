![logo](./waffle/public/favicon.ico)
# w(r)affle

A small app that helps with randomized image picking (with support for dynamic branding), *with optional authentication support for images that should not be leaked on the Internet*

## Install [node.js](https://nodejs.org/en/download)

## Clone the repository
```sh
git clone git@github.com:axbg/waffle.git
```

## Operational modes
The application has 2 operational modes:
1. [Without authentication (static app)](#1-without-authentication)
2. [With authentication (using a back-end)](#2-with-authentication)

#
### 1. Without authentication ([live](https://harmonious-salmiakki-a4c12c.netlify.app/))
- Navigate into the *waffle* directory and install the required dependencies
    ```bash
    cd waffle
    npm install
    ```

    - If you want to run the application in development mode, execute:
        ```bash
        npm run dev
        ```

    - If you want to build the application, obtaining a static site that can be served by any web server, execute:
        ```bash
        npm run build
        ```
        - The resulting build will be written in the *dist* directory

- To use the URL import function, your web server should provide the following resources:
    - /path - a list of all the images that will be used in the raffle
    - /path/image.ext - an individual image

- *P.S: don't forget about CORS* 🥶

#
### 2. With authentication
- Configure the environment file (.env) in the *waffle-server* directory
    ```sh
    port=8080
    images_path=/Users/user/Desktop/secret_pictures
    jwt_secret=something_very_very_secret
    db_name=test_db.db # sqlite db
    ```

- Execute the setup script
    ```sh
    chmod u+x start.sh
    ./start.sh
    ```

- Create a user
    ```sh
    cd waffle-server
    npm run create-user username password
    ```

- The app will start on http://localhost:port_value_from_the_config_file
    - To stop it, execute the command:
        ```bash
        kill $(ps aux | grep 'npm start' | awk '{print $2}')
        ```
