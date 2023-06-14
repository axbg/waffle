# Build FE
cd ./waffle
echo "VITE_REQUIRE_AUTHENTICATION=1" > .env
echo "VITE_LOGIN_PATH=/login" >> .env
npm install
npm run build

# Remove FE .env file
rm .env

# Move FE build to BE
cd ..
rm -rf ./waffle-server/dist
mv ./waffle/dist ./waffle-server/dist

# Install BE dependencies
cd waffle-server
npm install

# Configure database
npm run create-table

# Start BE
nohup npm start > ../log.out 2>&1 &
echo "Started app"