# Build FE
cd ./waffle
npm install
npm run build

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