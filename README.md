# w(r)affle

A small app that helps with randomized image picking (with support for dynamic branding), *now with auth support for images that should not be leaked on the Internet*

## Configure the environment file (.env)
```sh
port=8080
images_path=/Users/user/Desktop/secret_pictures
jwt_secret=something_very_very_secret
db_name=test_db.db
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