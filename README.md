![logo](./waffle/public/favicon.ico)
# w(r)affle

A small app that helps with randomized image picking (with support for dynamic branding), *now with auth support for images that should not be leaked on the Internet*

## Install [node.js](https://nodejs.org/en/download)

## Clone
```sh
git clone -b auth git@github.com:axbg/waffle.git
```

## Configure the environment file in waffle-server (.env)
```sh
port=8080
images_path=/Users/user/Desktop/secret_pictures
jwt_secret=something_very_very_secret
db_name=test_db.db # sqlite db
# this is just an example, please use better values 
```

## Execute the setup script
```sh
chmod u+x start.sh
./start.sh
```

## Create an user
```sh
cd waffle-server
npm run create-user username password
```

## Enjoy
The app will start on http://localhost:port_value_from_the_config_file
